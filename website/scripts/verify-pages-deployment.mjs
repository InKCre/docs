import { appendFile } from 'node:fs/promises'

const deploymentId = process.env.CLOUDFLARE_PAGES_DEPLOYMENT_ID
const deploymentUrl = process.env.CLOUDFLARE_PAGES_DEPLOYMENT_URL
const canonicalOrigin = new URL(process.env.INKCRE_WEBSITE_ORIGIN || 'https://inkcre.dev')

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

async function verifyOriginOnce(origin, expectNoindex) {
  const rootResponse = await fetchPage(new URL('/', origin))
  const rootBody = await rootResponse.text()

  if (rootResponse.status !== 200) {
    throw new Error(`${origin.origin}/ returned HTTP ${rootResponse.status}`)
  }
  if (!rootResponse.headers.get('content-type')?.startsWith('text/html')) {
    throw new Error(`${origin.origin}/ did not return HTML`)
  }
  if (!rootBody.includes('<html lang="en-US"')) {
    throw new Error(`${origin.origin}/ did not return the English website`)
  }
  if (!rootBody.includes(`<link rel="canonical" href="${canonicalOrigin.href}">`)) {
    throw new Error(`${origin.origin}/ did not declare ${canonicalOrigin.href} as canonical`)
  }

  const robotsHeader = rootResponse.headers.get('x-robots-tag') || ''
  if (expectNoindex !== robotsHeader.toLowerCase().includes('noindex')) {
    throw new Error(`${origin.origin}/ returned an unexpected X-Robots-Tag: ${robotsHeader}`)
  }

  const missingResponse = await fetchPage(new URL('/__inkcre_pages_missing__', origin))
  if (missingResponse.status !== 404) {
    throw new Error(`${origin.origin} missing route returned HTTP ${missingResponse.status}`)
  }

  const sitemapResponse = await fetchPage(new URL('/sitemap.xml', origin))
  const sitemap = await sitemapResponse.text()
  if (sitemapResponse.status !== 200 || !sitemap.includes(`<loc>${canonicalOrigin.href}</loc>`)) {
    throw new Error(`${origin.origin}/sitemap.xml does not expose the canonical root`)
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
      '- HTTPS, metadata, sitemap, robots, noindex, and 404 smoke: passed',
      '',
    ].join('\n')
  )
}
