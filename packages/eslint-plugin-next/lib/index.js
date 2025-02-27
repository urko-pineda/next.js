module.exports = {
  rules: {
    'no-css-tags': require('./rules/no-css-tags'),
    'no-sync-scripts': require('./rules/no-sync-scripts'),
    'no-html-link-for-pages': require('./rules/no-html-link-for-pages'),
    'no-img-element': require('./rules/no-img-element'),
    'no-unwanted-polyfillio': require('./rules/no-unwanted-polyfillio'),
    'no-page-custom-font': require('./rules/no-page-custom-font'),
    'no-title-in-document-head': require('./rules/no-title-in-document-head'),
    'google-font-display': require('./rules/google-font-display'),
    'google-font-preconnect': require('./rules/google-font-preconnect'),
    'link-passhref': require('./rules/link-passhref'),
    'no-document-import-in-page': require('./rules/no-document-import-in-page'),
    'no-head-import-in-document': require('./rules/no-head-import-in-document'),
    'no-script-in-document': require('./rules/no-script-in-document'),
    'no-script-in-head': require('./rules/no-script-in-head'),
    'no-typos': require('./rules/no-typos'),
    'no-duplicate-head': require('./rules/no-duplicate-head'),
    'next-script-for-ga': require('./rules/next-script-for-ga'),
  },
  configs: {
    recommended: {
      plugins: ['@next/next'],
      rules: {
        '@next/next/no-css-tags': 1,
        '@next/next/no-sync-scripts': 1,
        '@next/next/no-html-link-for-pages': 1,
        '@next/next/no-img-element': 1,
        '@next/next/no-unwanted-polyfillio': 1,
        '@next/next/no-page-custom-font': 1,
        '@next/next/no-title-in-document-head': 1,
        '@next/next/google-font-display': 1,
        '@next/next/google-font-preconnect': 1,
        '@next/next/link-passhref': 1,
        '@next/next/next-script-for-ga': 1,
        '@next/next/no-document-import-in-page': 2,
        '@next/next/no-head-import-in-document': 2,
        '@next/next/no-script-in-document': 2,
        '@next/next/no-script-in-head': 2,
        '@next/next/no-typos': 1,
        '@next/next/no-duplicate-head': 2,
      },
    },
    'core-web-vitals': {
      plugins: ['@next/next'],
      extends: ['plugin:@next/next/recommended'],
      rules: {
        '@next/next/no-sync-scripts': 2,
        '@next/next/no-html-link-for-pages': 2,
      },
    },
  },
}
