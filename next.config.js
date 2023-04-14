const path = require('path');

const moduleExports = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  trailingSlash: true,
  i18n: {
    locales: ['en', 'ar'],
    defaultLocale: 'en',
  },
  env: {
    APP_ENV: process.env.APP_ENV,
  },
};

module.exports = moduleExports;
