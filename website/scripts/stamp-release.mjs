import { appendFile, readFile, writeFile } from 'node:fs/promises'
import { pathToFileURL } from 'node:url'

const markerName = 'inkcre-release'
const identityPattern = /^[a-f0-9]{40}:[1-9][0-9]*:[1-9][0-9]*$/

function validateIdentity(identity) {
  if (typeof identity !== 'string' || !identityPattern.test(identity)) {
    throw new Error('Release identity must contain an exact SHA, run ID, and build attempt')
  }
}

function releaseTags(html) {
  return (html.match(/<meta\b[^>]*>/gi) ?? []).filter((tag) =>
    /\sname\s*=\s*(["'])inkcre-release\1/i.test(tag)
  )
}

export function stampRelease(html, identity) {
  validateIdentity(identity)
  if (
    (html.match(/<head\b[^>]*>/gi) ?? []).length !== 1 ||
    (html.match(/<\/head\s*>/gi) ?? []).length !== 1 ||
    !/<head\b[^>]*>[\s\S]*<\/head\s*>/i.test(html)
  ) {
    throw new Error('Release root HTML must contain exactly one head')
  }
  if (releaseTags(html).length !== 0) {
    throw new Error('Release root HTML already contains a release marker')
  }
  return html.replace(
    /<head\b[^>]*>/i,
    (head) => `${head}<meta name="${markerName}" content="${identity}">`
  )
}

export function requireReleaseIdentity(html, identity, address) {
  validateIdentity(identity)
  const head = html.match(/<head\b[^>]*>([\s\S]*?)<\/head\s*>/i)?.[1] ?? ''
  const tags = releaseTags(html)
  if (
    tags.length !== 1 ||
    !head.includes(tags[0]) ||
    tags[0].match(/\scontent\s*=\s*(["'])(.*?)\1/i)?.[2] !== identity
  ) {
    throw new Error(`${address} does not contain exactly one expected release marker ${identity}`)
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const identity = `${process.env.RELEASE_HEAD_SHA}:${process.env.GITHUB_RUN_ID}:${process.env.GITHUB_RUN_ATTEMPT}`
  const root = new URL('../.vitepress/dist/index.html', import.meta.url)
  await writeFile(root, stampRelease(await readFile(root, 'utf8'), identity))
  if (process.env.GITHUB_OUTPUT) {
    await appendFile(process.env.GITHUB_OUTPUT, `release_identity=${identity}\n`)
  }
}
