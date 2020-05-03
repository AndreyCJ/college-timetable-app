const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = (app) => {
  app.use(
    '/api',
    createProxyMiddleware({
      target: `http://[::1]:8080`,
      changeOrigin: true,
    })
  );
};