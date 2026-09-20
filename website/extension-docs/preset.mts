import { createRequire } from 'node:module'
import { dirname } from 'node:path'
import { defineConfig, type DefaultTheme } from 'vitepress'

const toolchain = createRequire(createRequire(import.meta.url).resolve('vitepress/package.json'))

type Scope = 'global' | 'python' | 'module-federation'
const scopeNames: Record<Scope, string> = {
  global: 'General',
  python: 'Python',
  'module-federation': 'Web',
}

/** First-party presentation only; Registry accepts any author's static output. */
export function extensionDocs(options: {
  name: string
  title: string
  scope: Scope
  description: string
  sidebar: DefaultTheme.SidebarItem[]
}) {
  const version = process.env.INKCRE_DOCS_VERSION
  if (!version) throw new Error('Set INKCRE_DOCS_VERSION to the exact Extension Release version.')
  const registry = new URL(process.env.INKCRE_DOCS_REGISTRY_URL ?? 'https://registry.inkcre.dev')
  const edition = `${options.name} · ${version} · ${scopeNames[options.scope]}`
  return defineConfig({
    base: '/',
    cleanUrls: true,
    lang: 'en',
    title: options.title,
    description: options.description,
    lastUpdated: true,
    // Pages live outside this toolchain's package root. Use its Vue for both
    // client and server rendering instead of requiring a second installation.
    vite: {
      resolve: {
        alias: { vue: dirname(toolchain.resolve('vue/package.json')) },
      },
    },
    head: [['meta', { name: 'inkcre-documentation', content: edition }]],
    themeConfig: {
      nav: [
        { text: `${version} · ${scopeNames[options.scope]}`, link: '/' },
        { text: 'InKCre', link: 'https://inkcre.dev/getting-started' },
        {
          text: 'Registry',
          link: new URL(`/explore/${options.name}?version=${encodeURIComponent(version)}`, registry)
            .href,
        },
      ],
      sidebar: options.sidebar,
      search: { provider: 'local' },
      footer: { message: edition },
    },
  })
}
