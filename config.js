// themeId: The space id which you can find on storyblok app.storyblok.com in the space settings.
// domain: The domain without the protocol. Example: city.me.storyblok.com

module.exports = {
  blok: {
    apiVersion: 2,
    themeId: '40479',
    domain: 'fc147f74.me.storyblok.com',
    apiKey: require('./token'),
    basePath: 'views',
    quickstartToken: '',
    environment: 'live'
  }
}
