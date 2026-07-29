export const canonicalOrigin = 'https://inkcre.dev'
export const defaultLanguage = 'en-US'

export const siteRoutes = Object.freeze([
  {
    publicPath: '/',
    outputPath: 'index.html',
  },
  {
    publicPath: '/developer/',
    outputPath: 'developer/index.html',
  },
  {
    publicPath: '/developer/architecture',
    outputPath: 'developer/architecture.html',
  },
  {
    publicPath: '/developer/contributing',
    outputPath: 'developer/contributing.html',
  },
  {
    publicPath: '/about/',
    outputPath: 'about/index.html',
  },
])

export function canonicalHref(publicPath) {
  return new URL(publicPath, canonicalOrigin).href
}
