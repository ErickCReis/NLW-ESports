module.exports = {
  name: 'NLW ESports',
  slug: 'nlw-esports',
  owner: 'erickreis',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'light',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'cover',
    backgroundColor: '#121214',
  },
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#121214',
    },
    package: 'com.erickreis.nlwesports',
  },
  web: {
    favicon: './assets/favicon.png',
  },
  extra: {
    eas: {
      projectId: 'df410c09-2b46-4833-a954-5c04049af1ba',
    },
    apiUrl: process.env.API_URL || 'https://nlw-esports.vercel.app/api',
  },
};
