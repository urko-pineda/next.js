const rule = require('@next/eslint-plugin-next/lib/rules/next-script-for-ga')

const RuleTester = require('eslint').RuleTester

const ERROR_MSG =
  'Use the `next/script` component for loading third party scripts. See: https://nextjs.org/docs/messages/next-script-for-ga.'

RuleTester.setDefaultConfig({
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      modules: true,
      jsx: true,
    },
  },
})

var ruleTester = new RuleTester()
ruleTester.run('sync-scripts', rule, {
  valid: [
    `import Script from 'next/script'

      export class Blah extends Head {
        render() {
          return (
            <div>
              <h1>Hello title</h1>
              <Script
                src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
                strategy="lazyOnload"
              ></Script>
              <Script>
                {\`
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){window.dataLayer.push(arguments);}
                  gtag('js', new Date());

                  gtag('config', 'GA_MEASUREMENT_ID');
                \`}
              </Script>
            </div>
          );
        }
    }`,
    `import Script from 'next/script'

      export class Blah extends Head {
        render() {
          return (
            <div>
              <h1>Hello title</h1>
              <Script>
                {\`(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
                    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
                    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
                    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
                    
                    ga('create', 'UA-XXXXX-Y', 'auto');
                    ga('send', 'pageview');
                })\`}
              </Script>
            </div>
          );
        }
    }`,
    `import Script from 'next/script'

        export class Blah extends Head {
        render() {
            return (
            <div>
                <h1>Hello title</h1>
                <Script>
                    {\`window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;
                    ga('create', 'UA-XXXXX-Y', 'auto');
                    ga('send', 'pageview');
                    })\`}
                </Script>
            </div>
            );
        }
    }`,
    `export class Blah extends Head {
          render() {
            return (
              <div>
                <h1>Hello title</h1>
                <script dangerouslySetInnerHTML={{}} />
              </div>
            );
          }
      }`,
  ],

  invalid: [
    {
      code: `
        export class Blah extends Head {
          render() {
            return (
              <div>
                <h1>Hello title</h1>
                <script async src='https://www.googletagmanager.com/gtag/js?id=$\{GA_TRACKING_ID}' />
                <script
                  dangerouslySetInnerHTML={{
                    __html: \`
                      window.dataLayer = window.dataLayer || [];
                      function gtag(){dataLayer.push(arguments);}
                      gtag('js', new Date());
                      gtag('config', '\${GA_TRACKING_ID}', {
                        page_path: window.location.pathname,
                      });
                  \`,
                }}/>
              </div>
            );
          }
      }`,
      errors: [
        {
          message: ERROR_MSG,
          type: 'JSXOpeningElement',
        },
      ],
    },
    {
      code: `
        export class Blah extends Head {
          render() {
            return (
              <div>
                <h1>Hello title</h1> qqq
                {/* Google Tag Manager - Global base code */}
                <script
                dangerouslySetInnerHTML={{
                  __html: \`
                    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                    })(window,document,'script','dataLayer', '\${GTM_ID}');
                  \`,
                }}/>
              </div>
            );
          }
      }`,
      errors: [
        {
          message: ERROR_MSG,
          type: 'JSXOpeningElement',
        },
      ],
    },
    {
      code: `
        export class Blah extends Head {
          render() {
            return (
              <div>
                <h1>Hello title</h1>
                <script dangerouslySetInnerHTML={{
                    __html: \`
                      (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
                        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
                        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
                        })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

                        ga('create', 'UA-XXXXX-Y', 'auto');
                        ga('send', 'pageview');
                    \`,
                  }}/>
              </div>
            );
          }
      }`,
      errors: [
        {
          message: ERROR_MSG,
          type: 'JSXOpeningElement',
        },
      ],
    },
    {
      code: `
        export class Blah extends Head {
          render() {
            return (
              <div>
                <h1>Hello title</h1>
                <script dangerouslySetInnerHTML={{
                    __html: \`
                        window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;
                        ga('create', 'UA-XXXXX-Y', 'auto');
                        ga('send', 'pageview');
                    \`,
                  }}/>
                <script async src='https://www.google-analytics.com/analytics.js'></script>
              </div>
            );
          }
      }`,
      errors: [
        {
          message: ERROR_MSG,
          type: 'JSXOpeningElement',
        },
      ],
    },
  ],
})
