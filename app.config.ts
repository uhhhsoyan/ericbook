import 'dotenv/config';

export default {
  expo: {
    name: 'SocialMiniMedia',
    description: 'Mini social media app',
    slug: 'minisocials',
    privacy: 'public',
    platforms: ['ios', 'android', 'web'],
    version: process.env.EXPO_VERSION || '0.0.1',
    orientation: 'portrait',
    primaryColor: process.env.PRIMARY_COLOR || '#8a6ac6',
    icon: './assets/icon.png',
    splash: {
      image: './assets/splash.png',
      resizeMode: 'cover',
      primaryColor: process.env.PRIMARY_COLOR || '#8a6ac6',
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      bundleIdentifier: 'com.elemental.app', // TODO: Update
      buildNumber: process.env.EXPO_BUILD_NUMBER ?? '1',
      supportsTablet: true,
    },
    extra: {
      bugsnag: {
        apiKey: process.env.BUGSNAG_API_KEY,
      },
      offline: process.env.EXPO_OFFLINE === 'true',
    },
    scheme: 'elemental', // TODO: Update
    android: {
      package: 'com.elemental.app', // TODO: Update
      versionCode: parseInt(process.env.EXPO_BUILD_NUMBER ?? '1'),
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: process.env.PRIMARY_COLOR || '#8a6ac6',
      },
    },
    web: {
      favicon: './assets/favicon.png',
    },
  },
};
