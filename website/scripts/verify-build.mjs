import { readdir, readFile } from 'node:fs/promises'
import { relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const distUrl = new URL('../.vitepress/dist/', import.meta.url)
const indexUrl = new URL('index.html', distUrl)
const canonicalOrigin = 'https://inkcre.dev'

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

function publicPathForOutput(routePath) {
  if (routePath === 'index.html') {
    return '/'
  }

  if (routePath.endsWith('/index.html')) {
    return `/${routePath.slice(0, -'index.html'.length)}`
  }

  return `/${routePath.slice(0, -'.html'.length)}`
}

const indexHtml = await readFile(indexUrl, 'utf8').catch(() => {
  fail('the public root did not produce index.html')
})

if (!indexHtml.includes('<html lang="en-US"')) {
  fail('the public root is not marked as en-US')
}

if (!indexHtml.includes('<meta name="description"')) {
  fail('the public root has no description metadata')
}

if (!indexHtml.includes(`<link rel="canonical" href="${canonicalOrigin}/">`)) {
  fail('the public root has no canonical production URL')
}

if (!indexHtml.includes(`<meta property="og:url" content="${canonicalOrigin}/">`)) {
  fail('the public root has no Open Graph production URL')
}

const sitemap = await readFile(new URL('sitemap.xml', distUrl), 'utf8').catch(() => {
  fail('the production build did not emit sitemap.xml')
})

if (!sitemap.includes(`<loc>${canonicalOrigin}/</loc>`)) {
  fail('the sitemap does not contain the canonical public root')
}

const robots = await readFile(new URL('robots.txt', distUrl), 'utf8').catch(() => {
  fail('the production build did not emit robots.txt')
})

if (!robots.includes(`Sitemap: ${canonicalOrigin}/sitemap.xml`)) {
  fail('robots.txt does not advertise the canonical sitemap')
}

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

for (const fileUrl of htmlFiles) {
  const filePath = fileURLToPath(fileUrl)
  const routePath = relative(distPath, filePath)
  const html = await readFile(fileUrl, 'utf8')

  if (routePath === 'en/index.html' || routePath.startsWith('en/')) {
    fail(`the default locale leaked into the public route: ${routePath}`)
  }

  const pageUrl = new URL(publicPathForOutput(routePath), 'https://website.invalid')

  for (const match of html.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
    const generatedUrl = new URL(match[1], pageUrl)

    if (generatedUrl.origin !== pageUrl.origin) {
      continue
    }

    if (/^\/en(?:\/|$)/.test(generatedUrl.pathname)) {
      fail(`the default locale leaked into a generated link in ${routePath}`)
    }

    if (/\.(?:html|md)$/.test(generatedUrl.pathname)) {
      fail(`a generated internal link exposes a source or output extension in ${routePath}`)
    }
  }
}

console.log(`Verified ${htmlFiles.length} generated HTML files and the English root route.`)
