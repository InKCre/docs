import { defineConfig, type HeadConfig } from 'vitepress'
import { canonicalOrigin, defaultLanguage } from '../scripts/site-contract.mjs'

const description =
  'Public documentation for InKCre, an actively developed system for reusable information.'

export default defineConfig({
  srcDir: 'content',
  base: '/',
  cleanUrls: true,
  lastUpdated: true,
  title: 'InKCre',
  description,
  rewrites: {
    'en/:rest*': ':rest*',
  },
  locales: {
    root: {
      label: 'English',
      lang: defaultLanguage,
      title: 'InKCre',
      description,
    },
  },
  sitemap: {
    hostname: canonicalOrigin,
  },
  transformPageData(pageData) {
    const url = new URL(
      pageData.relativePath.replace(/(?:(^|\/)index)?\.md$/, '$1'),
      canonicalOrigin
    ).href
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
    nav: [
      { text: 'Developer', link: '/developer/' },
      { text: 'About', link: '/about/' },
      { text: 'GitHub', link: 'https://github.com/InKCre' },
    ],
    sidebar: {
      '/developer/': [
        {
          text: 'Developer Guide',
          items: [
            { text: 'Overview', link: '/developer/' },
            { text: 'Architecture', link: '/developer/architecture' },
            { text: 'Contributing', link: '/developer/contributing' },
          ],
        },
      ],
    },
    search: {
      provider: 'local',
    },
    editLink: {
      pattern: ({ filePath }) =>
        `https://github.com/InKCre/docs/edit/main/website/content/${filePath}`,
      text: 'Edit this page',
    },
    socialLinks: [{ icon: 'github', link: 'https://github.com/InKCre/docs' }],
  },
})
