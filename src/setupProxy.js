const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = function(app){
    app.use(
        createProxyMiddleware("/api",{
            target:"http://3.35.173.122:4000",
            changeOrigin:true,
        })
    )
}