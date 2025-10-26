const dotenv = require('dotenv');

dotenv.config({ path: '.env.version', quiet: true });

module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        '@tamagui/babel-plugin',
        {
          components: ['tamagui'],
          config: './tamagui.config.ts',
          logTimings: true,
          disableExtraction: process.env.NODE_ENV === 'development',
        },
      ],

      ['babel-plugin-transform-inline-environment-variables', {
        include: ['APP_VERSION', 'APP_BUILD_NUMBER']
      }],

      // NOTE: this is only necessary if you are using reanimated for animations
      'react-native-reanimated/plugin',
    ],
  };
};