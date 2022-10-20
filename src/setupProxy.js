const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/api', {
      target: 'http://54.180.202.117:4000',
      changeOrigin: true,
    })
  );
};
