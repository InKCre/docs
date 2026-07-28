import { appendFile } from 'node:fs/promises'

const apiToken = process.env.CLOUDFLARE_API_TOKEN
const accountId = process.env.CLOUDFLARE_ACCOUNT_ID
const projectName = process.env.CLOUDFLARE_PAGES_PROJECT
const domainName = process.env.CLOUDFLARE_PAGES_DOMAIN || 'inkcre.dev'
const stage = process.argv[2] || 'all'

if (!apiToken || !accountId || !projectName) {
  throw new Error('Cloudflare Pages configuration requires token, account, and project inputs')
}
if (!['all', 'project', 'domain'].includes(stage)) {
  throw new Error(`Unknown Cloudflare Pages configuration stage: ${stage}`)
}

const apiBase = `https://api.cloudflare.com/client/v4/accounts/${accountId}/pages`

async function request(path, init = {}) {
  let lastError

  for (let attempt = 1; attempt <= 4; attempt += 1) {
    try {
      const response = await fetch(`${apiBase}${path}`, {
        ...init,
        headers: {
          Authorization: `Bearer ${apiToken}`,
          'Content-Type': 'application/json',
          ...init.headers,
        },
        signal: AbortSignal.timeout(15000),
      })
      const payload = await response.json()

      if (response.status === 429 || response.status >= 500) {
        throw new Error(`Cloudflare API returned retryable HTTP ${response.status}`)
      }

      return { response, payload }
    } catch (error) {
      lastError = error
      if (attempt < 4) {
        await new Promise((resolve) => setTimeout(resolve, attempt * 1000))
      }
    }
  }

  throw lastError
}

function assertSuccess(operation, response, payload) {
  if (!response.ok || !payload.success) {
    const details = payload.errors?.map((error) => error.message).join('; ') || 'unknown error'
    throw new Error(`${operation} failed with HTTP ${response.status}: ${details}`)
  }
}

const projectPath = `/projects/${encodeURIComponent(projectName)}`
let projectResult = await request(projectPath)

if (projectResult.response.status === 404) {
  projectResult = await request('/projects', {
    method: 'POST',
    body: JSON.stringify({
      name: projectName,
      production_branch: 'main',
    }),
  })
  assertSuccess('Create Pages project', projectResult.response, projectResult.payload)
} else {
  assertSuccess('Read Pages project', projectResult.response, projectResult.payload)
}

if (projectResult.payload.result?.source) {
  throw new Error(`${projectName} is not a Direct Upload Pages project`)
}

if (projectResult.payload.result?.production_branch !== 'main') {
  projectResult = await request(projectPath, {
    method: 'PATCH',
    body: JSON.stringify({ production_branch: 'main' }),
  })
  assertSuccess('Set Pages production branch', projectResult.response, projectResult.payload)
}

if (stage === 'project') {
  console.log(`Cloudflare Pages project ${projectName} is configured.`)
  process.exit(0)
}

const domainPath = `${projectPath}/domains/${encodeURIComponent(domainName)}`
let domainResult = await request(domainPath)

if (domainResult.response.status === 404) {
  domainResult = await request(`${projectPath}/domains`, {
    method: 'POST',
    body: JSON.stringify({ name: domainName }),
  })
  assertSuccess('Attach Pages custom domain', domainResult.response, domainResult.payload)
} else {
  assertSuccess('Read Pages custom domain', domainResult.response, domainResult.payload)
}

const domainStatus = domainResult.payload.result?.status
if (['blocked', 'deactivated', 'error'].includes(domainStatus)) {
  throw new Error(`${domainName} entered unusable Cloudflare Pages status: ${domainStatus}`)
}

console.log(`Cloudflare Pages project ${projectName} and domain ${domainName} are configured.`)

if (process.env.GITHUB_STEP_SUMMARY) {
  await appendFile(
    process.env.GITHUB_STEP_SUMMARY,
    [
      '## Cloudflare Pages configuration',
      '',
      `- Project: \`${projectName}\``,
      `- Production branch: \`main\``,
      `- Custom domain: \`${domainName}\``,
      `- Domain status before delivery: \`${domainStatus}\``,
      '',
    ].join('\n')
  )
}
