const dotenv = require('dotenv');

dotenv.config({ path: '.env.version', quiet: true });

module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'expo-router/babel',
      ['babel-plugin-transform-inline-environment-variables', {
        include: ['APP_VERSION', 'APP_BUILD_NUMBER']
      }],
    ],
  };
};