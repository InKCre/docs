import assert from 'node:assert/strict'
import { test } from 'node:test'
import { stampRelease, requireReleaseIdentity } from './stamp-release.mjs'
import { verifyPagesDeployment } from './verify-pages-deployment.mjs'

const identity = `${'a'.repeat(40)}:12345:1`
const staleIdentity = `${'b'.repeat(40)}:12344:1`
const rootHtml =
  '<html lang="en-US"><head><link rel="canonical" href="https://inkcre.dev/"><meta property="og:url" content="https://inkcre.dev/"></head><body>Docs</body></html>'
const env = {
  CLOUDFLARE_PAGES_DEPLOYMENT_ID: 'deployment',
  CLOUDFLARE_PAGES_DEPLOYMENT_URL: 'https://release.inkcre.pages.dev',
  INKCRE_PAGES_RELEASE_IDENTITY: identity,
}

function fakeFetch({ canonicalIdentity = identity, pagesIdentity = identity, mutate } = {}) {
  const requested = []
  const fetchPage = async (input) => {
    const url = new URL(input)
    requested.push(url.href)
    const preview = url.hostname.endsWith('.pages.dev')
    const marker = preview ? pagesIdentity : canonicalIdentity
    const headers = {
      'content-type': 'text/html',
      ...(preview ? { 'x-robots-tag': 'noindex' } : {}),
    }
    if (url.pathname === '/__inkcre_pages_missing__') return new Response('', { status: 404 })
    if (url.pathname === '/sitemap.xml') return new Response('<urlset></urlset>')
    if (url.pathname === '/robots.txt')
      return new Response('Sitemap: https://inkcre.dev/sitemap.xml')
    let html = marker ? stampRelease(rootHtml, marker) : rootHtml
    if (mutate) html = mutate(html)
    return new Response(html, { headers })
  }
  return { fetchPage, retryAttempts: 1, requested }
}

test('stamp changes only head metadata and requires a valid exact build identity', () => {
  const stamped = stampRelease(rootHtml, identity)
  assert.equal(
    stamped,
    rootHtml.replace('<head>', `<head><meta name="inkcre-release" content="${identity}">`)
  )
  requireReleaseIdentity(stamped, identity, 'root')
  for (const invalid of [
    undefined,
    '',
    `${'a'.repeat(39)}:1:1`,
    `${'g'.repeat(40)}:1:1`,
    `${'a'.repeat(40)}:0:1`,
    `${'a'.repeat(40)}:1:0`,
    `${identity}\n`,
  ]) {
    assert.throws(() => stampRelease(rootHtml, invalid), /Release identity/)
  }
})

test('stamp rejects missing, duplicate, reversed heads and existing markers', () => {
  for (const html of [
    '<html></html>',
    '<head></head><head></head>',
    '<head></head></head>',
    '</head><head>',
    stampRelease(rootHtml, identity),
  ]) {
    assert.throws(() => stampRelease(html, identity))
  }
})

test('root validation rejects duplicate, missing, wrong, or body-only markers', () => {
  const stamped = stampRelease(rootHtml, identity)
  for (const html of [
    rootHtml,
    stampRelease(rootHtml, staleIdentity),
    stampRelease(rootHtml, `${'a'.repeat(40)}:12345:2`),
    stampRelease(rootHtml, `${'a'.repeat(40)}:12346:1`),
    stamped.replace('name="inkcre-release"', 'data-name="inkcre-release"'),
    stamped.replace(`content="${identity}"`, `data-content="${identity}"`),
    stamped.replace('</head>', `<meta name="inkcre-release" content="${staleIdentity}"></head>`),
    rootHtml.replace('<body>', `<body><meta name="inkcre-release" content="${identity}">`),
  ]) {
    assert.throws(() => requireReleaseIdentity(html, identity, 'root'), /expected release marker/)
  }
})

test('production checks the expected build on both actual roots and retains all resource checks', async () => {
  const options = fakeFetch()
  await verifyPagesDeployment(env, options)
  assert.equal(options.requested.length, 8)
  assert(options.requested.includes('https://inkcre.dev/'))
  assert(options.requested.includes('https://release.inkcre.pages.dev/'))
})

for (const [name, identities] of [
  ['stale canonical root', { canonicalIdentity: staleIdentity }],
  ['stale immutable root', { pagesIdentity: staleIdentity }],
  ['missing production marker', { canonicalIdentity: null }],
]) {
  test(`production rejects ${name} without network or retry delays`, async () => {
    await assert.rejects(
      verifyPagesDeployment(env, fakeFetch(identities)),
      /expected release marker/
    )
  })
}

test('preview retains unmarked root behavior and never contacts canonical origin', async () => {
  const options = fakeFetch({ pagesIdentity: null })
  await verifyPagesDeployment(
    { ...env, INKCRE_PAGES_SMOKE_MODE: 'preview', INKCRE_PAGES_RELEASE_IDENTITY: undefined },
    options
  )
  assert.equal(options.requested.length, 4)
  assert(options.requested.every((address) => new URL(address).hostname.endsWith('.pages.dev')))
})

test('existing metadata gates still reject invalid roots', async () => {
  await assert.rejects(
    verifyPagesDeployment(
      env,
      fakeFetch({ mutate: (html) => html.replace('rel="canonical"', 'rel="alternate"') })
    ),
    /canonical URL/
  )
})
