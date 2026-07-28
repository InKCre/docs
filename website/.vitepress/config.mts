import { defineConfig, type HeadConfig } from 'vitepress'

const description =
  'Public documentation for InKCre, an actively developed system for reusable information.'
const siteOrigin = 'https://inkcre.dev'

export default defineConfig({
  srcDir: 'content',
  base: '/',
  cleanUrls: true,
  title: 'InKCre',
  description,
  rewrites: {
    'en/:rest*': ':rest*',
  },
  locales: {
    root: {
      label: 'English',
      lang: 'en-US',
      title: 'InKCre',
      description,
    },
  },
  sitemap: {
    hostname: siteOrigin,
  },
  transformPageData(pageData) {
    const url = new URL(pageData.relativePath.replace(/(?:(^|\/)index)?\.md$/, '$1'), siteOrigin)
      .href
    const title =
      pageData.title && pageData.title !== 'InKCre' ? `${pageData.title} | InKCre` : 'InKCre'
    const pageDescription = pageData.description || description

    ;((pageData.frontmatter.head ??= []) as HeadConfig[]).push(
      ['link', { rel: 'canonical', href: url }],
      ['meta', { property: 'og:type', content: 'website' }],
      ['meta', { property: 'og:site_name', content: 'InKCre' }],
      ['meta', { property: 'og:locale', content: 'en_US' }],
      ['meta', { property: 'og:url', content: url }],
      ['meta', { property: 'og:title', content: title }],
      ['meta', { property: 'og:description', content: pageDescription }],
      ['meta', { name: 'twitter:card', content: 'summary' }],
      ['meta', { name: 'twitter:title', content: title }],
      ['meta', { name: 'twitter:description', content: pageDescription }]
    )
  },
  themeConfig: {
    socialLinks: [{ icon: 'github', link: 'https://github.com/InKCre/docs' }],
  },
})
