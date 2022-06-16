const EslintWebpackPlugin = require("eslint-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const path = require('path');
// 返回处理样式loader函数
const getStyleLoaders = (pre) => {
    return [
                "style-loader",
                "css-loader",
                {
                    //处理css兼容性问题，配合package.json的babelslist来指定兼容性
                    loader:"postcss-loader",
                    options:{
                        postcssOptions:{
                            plugins:["postcss-preset-env"],
                        }
                    }
                },
                pre,
            ].filter(Boolean);
};

module.exports = {
    //入口文件
    entry: "./src/main.js",
    //输出文件
    output:{
        //开发模式不用指定路径
        path:undefined,
        //输出JS主文件
        filename:"static/js/[name].js",
        //其他JS文件
        chunkFilename:"static/js/[name].chunk.js",
        //输出的其他文件路径
        assetModuleFilename:"static/media/[hash:10][ext][query]",
    },
    //加载器
    module:{
        rules:[
            //处理css文件
            {
                test:/\.css$/,
                use:getStyleLoaders(),
            },
            {
                test:/\.less$/,
                use:getStyleLoaders("less-loader"),
            },
            {
                test:/\.s[ac]ss$/,
                use:getStyleLoaders("sass-loader"),
            },
            {
                test:/\.styl$/,
                use:getStyleLoaders("stylus-loader"),
            },
            //处理图片
            {
                test:/\.(png|jpg|jpeg|gif|bmp|webp|svg)$/,
                type:"asset",
                parser:{
                    dataUrlCondition:{
                        maxSize:1024*1024,
                    },
                }
            },
            //处理其他资源,例如字体文件
            {
                test:/\.(woff|woff2|eot|ttf|otf)$/,
                type:"asset/resource",
            },
            //处理js文件
            {
                test: /\.jsx?$/,
                //只处理src目录下的js、jsx文件
                include: path.resolve(__dirname, "../src"),
                loader: "babel-loader",
                options: {
                  cacheDirectory: true, // 开启babel编译缓存
                  cacheCompression: false, // 缓存文件不要压缩
                  plugins: [
                    "react-refresh/babel", // 激活react的HMR,热更新
                    "babel-plugin-styled-components", // 激活styled-components的HMR
                  ],
                },
          },
        ]
    },
   
    plugins:[
        //eslint检查
        new EslintWebpackPlugin({
            //指定检查的文件路径
            context:path.resolve(__dirname, "../src"),
            //不检查这里的文件
            exclude:"node_modules",
            //缓存之前的编译结果
            cache:true,
            //缓存的路径
            cacheLocation: path.resolve(__dirname, "../node_modules/.cache/.eslintcache"),
        }),
        //处理html文件
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "../public/index.html"),
          }),
        new ReactRefreshWebpackPlugin(), // 激活react的HMR,热更新
    ],
    //开发环境模式
    mode: "development",
    //开发模式下的调试,方便找到代码出错的位置
    devtool: "cheap-module-source-map",
    //对打包结果进行优化
    optimization: {
        //开发模式下的打包规则
        splitChunks: {
          chunks: "all",//不管异步加载还是同步加载的模块都提取出来，打包到一个文件中
        },
        //避免文件的频繁变更导致浏览器缓存失效
        runtimeChunk: {
          name: (entrypoint) => `runtime~${entrypoint.name}.js`,
        },
      },
    resolve: {
        //自动补全文件扩展名
        extensions: [".js", ".jsx"],
     },
      devServer: {
        host: "localhost",
        port: 3770,
        open: true,
        hot: true, // 开启HMR
        historyApiFallback: true, // 解决前端路由刷新404问题
      },
}
