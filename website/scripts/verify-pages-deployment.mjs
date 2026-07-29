import { appendFile } from 'node:fs/promises'
import {
  canonicalHref,
  canonicalOrigin as canonicalOriginUrl,
  defaultLanguage,
  siteRoutes,
} from './site-contract.mjs'

const deploymentId = process.env.CLOUDFLARE_PAGES_DEPLOYMENT_ID
const deploymentUrl = process.env.CLOUDFLARE_PAGES_DEPLOYMENT_URL
const canonicalOrigin = new URL(canonicalOriginUrl)
const configuredCanonicalOrigin = new URL(process.env.INKCRE_WEBSITE_ORIGIN || canonicalOriginUrl)

if (configuredCanonicalOrigin.href !== canonicalOrigin.href) {
  throw new Error(
    `Deployment smoke origin ${configuredCanonicalOrigin.href} does not match ${canonicalOrigin.href}`
  )
}

if (!deploymentId) {
  throw new Error('Wrangler did not report a Cloudflare Pages deployment ID')
}
if (!deploymentUrl) {
  throw new Error('Wrangler did not report a Cloudflare Pages deployment URL')
}

const pagesOrigin = new URL(deploymentUrl)
if (pagesOrigin.protocol !== 'https:' || !pagesOrigin.hostname.endsWith('.pages.dev')) {
  throw new Error(`Unexpected Cloudflare Pages deployment URL: ${pagesOrigin.origin}`)
}

async function fetchPage(url) {
  return fetch(url, {
    redirect: 'error',
    signal: AbortSignal.timeout(10000),
  })
}

function matchingTags(html, tagName, expectedAttributes) {
  const tags = html.match(new RegExp(`<${tagName}\\b[^>]*>`, 'g')) ?? []

  return tags.filter((tag) => {
    const attributes = new Map(
      [...tag.matchAll(/([:\w-]+)="([^"]*)"/g)].map((match) => [match[1], match[2]])
    )
    return Object.entries(expectedAttributes).every(
      ([name, value]) => attributes.get(name) === value
    )
  })
}

function requireSingleTag(html, tagName, expectedAttributes, address, purpose) {
  if (matchingTags(html, tagName, expectedAttributes).length !== 1) {
    throw new Error(`${address} does not contain exactly one ${purpose}`)
  }
}

async function verifyOriginOnce(origin, expectNoindex) {
  await Promise.all(
    siteRoutes.map(async (route) => {
      const response = await fetchPage(new URL(route.publicPath, origin))
      const body = await response.text()
      const address = `${origin.origin}${route.publicPath}`
      const expectedCanonical = canonicalHref(route.publicPath)

      if (response.status !== 200) {
        throw new Error(`${address} returned HTTP ${response.status}`)
      }
      if (!response.headers.get('content-type')?.startsWith('text/html')) {
        throw new Error(`${address} did not return HTML`)
      }
      if (!body.includes(`<html lang="${defaultLanguage}"`)) {
        throw new Error(`${address} did not return the English website`)
      }
      requireSingleTag(
        body,
        'link',
        { rel: 'canonical', href: expectedCanonical },
        address,
        `canonical URL ${expectedCanonical}`
      )
      requireSingleTag(
        body,
        'meta',
        { property: 'og:url', content: expectedCanonical },
        address,
        `Open Graph URL ${expectedCanonical}`
      )

      const robotsHeader = response.headers.get('x-robots-tag') || ''
      if (expectNoindex !== robotsHeader.toLowerCase().includes('noindex')) {
        throw new Error(`${address} returned an unexpected X-Robots-Tag: ${robotsHeader}`)
      }
    })
  )

  const missingResponse = await fetchPage(new URL('/__inkcre_pages_missing__', origin))
  if (missingResponse.status !== 404) {
    throw new Error(`${origin.origin} missing route returned HTTP ${missingResponse.status}`)
  }

  const sitemapResponse = await fetchPage(new URL('/sitemap.xml', origin))
  const sitemap = await sitemapResponse.text()
  if (sitemapResponse.status !== 200) {
    throw new Error(`${origin.origin}/sitemap.xml returned HTTP ${sitemapResponse.status}`)
  }
  for (const route of siteRoutes) {
    const expectedEntry = `<loc>${canonicalHref(route.publicPath)}</loc>`
    if (sitemap.split(expectedEntry).length - 1 !== 1) {
      throw new Error(
        `${origin.origin}/sitemap.xml does not expose ${canonicalHref(route.publicPath)} exactly once`
      )
    }
  }

  const robotsResponse = await fetchPage(new URL('/robots.txt', origin))
  const robots = await robotsResponse.text()
  if (
    robotsResponse.status !== 200 ||
    !robots.includes(`Sitemap: ${canonicalOrigin.href}sitemap.xml`)
  ) {
    throw new Error(`${origin.origin}/robots.txt does not expose the canonical sitemap`)
  }
}

async function verifyOrigin(origin, { attempts, delayMs, expectNoindex }) {
  let lastError

  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      await verifyOriginOnce(origin, expectNoindex)
      return
    } catch (error) {
      lastError = error
      if (attempt < attempts) {
        await new Promise((resolve) => setTimeout(resolve, delayMs))
      }
    }
  }

  throw lastError
}

await verifyOrigin(pagesOrigin, {
  attempts: 5,
  delayMs: 1000,
  expectNoindex: true,
})

await verifyOrigin(canonicalOrigin, {
  attempts: 60,
  delayMs: 10000,
  expectNoindex: false,
})

console.log(`Verified Pages deployment ${deploymentId} and ${canonicalOrigin.origin}.`)

if (process.env.GITHUB_STEP_SUMMARY) {
  await appendFile(
    process.env.GITHUB_STEP_SUMMARY,
    [
      '## Cloudflare Pages deployment',
      '',
      `- Deployment ID: \`${deploymentId}\``,
      `- Immutable URL: ${pagesOrigin.origin}`,
      `- Canonical URL: ${canonicalOrigin.origin}`,
      `- ${siteRoutes.length} routes, metadata, sitemap, robots, noindex, and 404 smoke: passed`,
      '',
    ].join('\n')
  )
}
