// 作为配置文件，直接导出配置对象即可
module.exports = {
    publicPath: "./",//设置文件路径,默认'/'，部署应用包时的基本 URL
    devServer: {
        // 设置主机地址
        host: '0.0.0.0',
        // 设置默认端口
        port: 8080,
        // 设置代理
        proxy: {
            '/qq': {
                // 目标 API 地址
                // target: 'http://djsh.xianjinloan.com',
                // target: 'http://djsh.vipgz1.idcfengye.com',
                // target:'http://test1.dianjishenghuo.cn',
                target:'http://test.weidianlingshou.com',
                // target:'http://2k256y6514.51mypc.cn',
                // // 如果要代理 websockets
                // ws: true,
                // 将主机标头的原点更改为目标URL
                changeOrigin: true,
                pathRewrite: {
                    '^/qq': ''
                }
            }
        }
    },
}