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
      { text: 'Getting Started', link: '/getting-started' },
      { text: 'Developer', link: '/developer/' },
      { text: 'About', link: '/about/' },
      { text: 'GitHub', link: 'https://github.com/InKCre' },
    ],
    sidebar: {
      '/': [
        {
          text: 'User Guide',
          items: [
            {
              text: 'Getting Started',
              link: '/getting-started',
              items: [
                { text: 'Connect to Your Instance', link: '/guide/connect' },
                { text: 'Prepare an Extension', link: '/guide/extensions' },
                { text: 'Collect Your First Source', link: '/guide/first-source' },
                { text: 'Run a Collection', link: '/guide/collect' },
                { text: 'Find What You Saved', link: '/guide/search' },
                { text: 'Use Your Information', link: '/guide/daily-use' },
              ],
            },
            { text: 'CLI / Agent Connection', link: '/guide/connect-cli' },
            {
              text: 'Connect More Sources',
              link: '/guide/sources',
              items: [
                { text: 'RSS and Atom', link: '/guide/sources/rss' },
                { text: 'GitHub Stars and Lists', link: '/guide/sources/github' },
                { text: 'Email over IMAP', link: '/guide/sources/mail' },
                { text: 'Telegram Inbox', link: '/guide/sources/telegram' },
                { text: 'Twitter / X Bookmarks', link: '/guide/sources/twitter' },
                { text: 'Memos-Compatible Capture', link: '/guide/sources/memos' },
              ],
            },
            { text: 'Schedule Collection', link: '/guide/schedules' },
            { text: 'Organize Your Information', link: '/guide/organization' },
            {
              text: 'Sinks',
              items: [{ text: 'Sinks: ChatGPT via MCP', link: '/guide/sinks/chatgpt' }],
            },
            {
              text: 'Self-Hosted',
              link: '/self-hosted/',
              items: [
                { text: 'Set Up an Instance', link: '/self-hosted/setup' },
                { text: 'Render and Neon', link: '/self-hosted/render-neon' },
                { text: 'Heroku and Neon', link: '/self-hosted/heroku-neon' },
                { text: 'Custom Self-Hosting', link: '/self-hosted/custom' },
              ],
            },
            { text: 'Troubleshooting', link: '/guide/troubleshooting' },
          ],
        },
      ],
      '/developer/': [
        {
          text: 'Ecosystem Developers',
          items: [
            { text: 'Build on InKCre', link: '/developer/ecosystem/' },
            { text: 'Build a Source Extension', link: '/developer/ecosystem/source-extension' },
          ],
        },
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
