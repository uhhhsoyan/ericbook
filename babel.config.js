module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          extensions: ['.js', '.ts', '.tsx', '.ios.ts', '.android.ts'],
          /** Keep up-to-date with tsconfig.json and import-sorter.json */
          alias: {
            '@assets': './assets',
            '@components': './components',
            '@constants': './constants',
            '@context': './context',
            '@graphql': './graphql',
            '@hooks': './hooks',
            '@navigation': './navigation',
            '@state': './state',
            '@types': './types',
          },
        },
      ],
    ],
  };
};
