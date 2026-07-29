import { readdir, readFile } from 'node:fs/promises'
import { relative } from 'node:path'
import { fileURLToPath } from 'node:url'
import { canonicalHref, canonicalOrigin, defaultLanguage, siteRoutes } from './site-contract.mjs'

const distUrl = new URL('../.vitepress/dist/', import.meta.url)
const sourceRepository = 'https://github.com/InKCre/docs'
const editSourceByRoute = new Map([
  ['/developer/', 'en/developer/index.md'],
  ['/developer/architecture', 'en/developer/architecture.md'],
  ['/developer/contributing', 'en/developer/contributing.md'],
  ['/about/', 'en/about/index.md'],
])

async function collectHtml(directoryUrl) {
  const entries = await readdir(directoryUrl, { withFileTypes: true })
  const files = []

  for (const entry of entries) {
    const entryUrl = new URL(entry.name + (entry.isDirectory() ? '/' : ''), directoryUrl)

    if (entry.isDirectory()) {
      files.push(...(await collectHtml(entryUrl)))
    } else if (entry.name.endsWith('.html')) {
      files.push(entryUrl)
    }
  }

  return files
}

function fail(message) {
  throw new Error(`Website build contract failed: ${message}`)
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

function requireSingleTag(html, tagName, expectedAttributes, routePath, purpose) {
  const matches = matchingTags(html, tagName, expectedAttributes)
  if (matches.length !== 1) {
    fail(`${routePath} does not contain exactly one ${purpose}`)
  }
  return matches[0]
}

function publicPathForOutput(routePath) {
  if (routePath === 'index.html') {
    return '/'
  }

  if (routePath.endsWith('/index.html')) {
    return `/${routePath.slice(0, -'index.html'.length)}`
  }

  return `/${routePath.slice(0, -'.html'.length)}`
}

const sitemap = await readFile(new URL('sitemap.xml', distUrl), 'utf8').catch(() => {
  fail('the production build did not emit sitemap.xml')
})

for (const route of siteRoutes) {
  const html = await readFile(new URL(route.outputPath, distUrl), 'utf8').catch(() => {
    fail(`${route.publicPath} did not produce ${route.outputPath}`)
  })
  const canonicalUrl = canonicalHref(route.publicPath)

  if (!html.includes(`<html lang="${defaultLanguage}"`)) {
    fail(`${route.publicPath} is not marked as ${defaultLanguage}`)
  }

  const descriptionTag = requireSingleTag(
    html,
    'meta',
    { name: 'description' },
    route.publicPath,
    'description metadata tag'
  )
  if (!/\bcontent="[^"]+"/.test(descriptionTag)) {
    fail(`${route.publicPath} has an empty description`)
  }

  requireSingleTag(
    html,
    'link',
    { rel: 'canonical', href: canonicalUrl },
    route.publicPath,
    'canonical URL'
  )
  requireSingleTag(
    html,
    'meta',
    { property: 'og:url', content: canonicalUrl },
    route.publicPath,
    'Open Graph URL'
  )

  if ((html.match(/<h1(?:\s|>)/g) ?? []).length !== 1) {
    fail(`${route.publicPath} does not contain exactly one H1`)
  }

  if (
    matchingTags(html, 'button', {
      type: 'button',
      'aria-label': 'Search',
    }).length !== 1
  ) {
    fail(`${route.publicPath} does not expose the local-search control exactly once`)
  }

  const sitemapEntry = `<loc>${canonicalUrl}</loc>`
  if (sitemap.split(sitemapEntry).length - 1 !== 1) {
    fail(`${route.publicPath} does not appear exactly once in the sitemap`)
  }

  const editSource = editSourceByRoute.get(route.publicPath)
  if (editSource) {
    const editUrl = `${sourceRepository}/edit/main/website/content/${editSource}`
    if (!html.includes(`href="${editUrl}"`)) {
      fail(`${route.publicPath} does not link to its website source`)
    }
  }
}

const robots = await readFile(new URL('robots.txt', distUrl), 'utf8').catch(() => {
  fail('the production build did not emit robots.txt')
})

if (!robots.includes(`Sitemap: ${canonicalOrigin}/sitemap.xml`)) {
  fail('robots.txt does not advertise the canonical sitemap')
}

await readFile(new URL('404.html', distUrl), 'utf8').catch(() => {
  fail('the production build did not emit 404.html')
})

const headers = await readFile(new URL('_headers', distUrl), 'utf8').catch(() => {
  fail('the production build did not emit Cloudflare Pages headers')
})

if (
  !headers.includes('https://inkcre-website.pages.dev/*') ||
  !headers.includes('https://:version.inkcre-website.pages.dev/*') ||
  !headers.includes('X-Robots-Tag: noindex')
) {
  fail('Cloudflare Pages origins are not protected from indexing')
}

const htmlFiles = await collectHtml(distUrl)
const distPath = fileURLToPath(distUrl)
const routeLinkCounts = new Map(siteRoutes.map((route) => [route.publicPath, 0]))

for (const fileUrl of htmlFiles) {
  const filePath = fileURLToPath(fileUrl)
  const routePath = relative(distPath, filePath)
  const html = await readFile(fileUrl, 'utf8')

  if (routePath === 'en/index.html' || routePath.startsWith('en/')) {
    fail(`the default locale leaked into the public route: ${routePath}`)
  }

  const pageUrl = new URL(publicPathForOutput(routePath), 'https://website.invalid')

  for (const match of html.matchAll(/\b(href|src)="([^"]+)"/g)) {
    const generatedUrl = new URL(match[2], pageUrl)

    if (generatedUrl.origin !== pageUrl.origin) {
      continue
    }

    if (/^\/en(?:\/|$)/.test(generatedUrl.pathname)) {
      fail(`the default locale leaked into a generated link in ${routePath}`)
    }

    if (/\.(?:html|md)$/.test(generatedUrl.pathname)) {
      fail(`a generated internal link exposes a source or output extension in ${routePath}`)
    }

    if (match[1] === 'href') {
      const linkedRoute = siteRoutes.find(
        (route) =>
          new URL(route.publicPath, 'https://website.invalid').pathname === generatedUrl.pathname
      )
      if (linkedRoute) {
        routeLinkCounts.set(linkedRoute.publicPath, routeLinkCounts.get(linkedRoute.publicPath) + 1)
      }
    }
  }
}

for (const [routePath, linkCount] of routeLinkCounts) {
  if (linkCount === 0) {
    fail(`${routePath} is not reachable through a generated internal link`)
  }
}

console.log(
  `Verified ${siteRoutes.length} declared routes across ${htmlFiles.length} generated HTML files.`
)
