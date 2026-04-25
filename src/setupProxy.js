/**
 * Dev-only proxy used when running with `REACT_APP_ENV=local`.
 * Forwards `/_api/*` to the production API at api.oijpcr.org and
 * rewrites the Origin / Referer headers so the API's CORS policy
 * (which only allows https://oijpcr.org) is satisfied.
 *
 * Has no effect in production builds; not bundled.
 */
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/_api',
        createProxyMiddleware({
            target: 'https://api.oijpcr.org',
            changeOrigin: true,
            pathRewrite: { '^/_api': '' },
            secure: true,
            onProxyReq: (proxyReq) => {
                proxyReq.setHeader('Origin', 'https://oijpcr.org');
                proxyReq.setHeader('Referer', 'https://oijpcr.org/');
            },
        })
    );
};
