/*
 * @Description: webpack配置
 * @Author: Tovi
 * @Date: 2019-12-31 16:15:50
 * @LastEditTime: 2020-04-07 13:55:26
 * @LastEditors: Tovi
 */
console.log(process.env.APP_SITE, 'site');
const appConfig = require('../src/config/app-config');

const path = require('path');
const ip = require('ip');
// 发布到服务器的路径定义
const publicPath = '/h/static/';
const glob = require('glob');
const webpack = require('webpack');
// 定义插件
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
// const SplitChunksPlugin = webpack.optimize.SplitChunksPlugin;
const ExtractTextPlugin = require('extract-text-webpack-plugin');
//路径定义
const nodeModPath = path.resolve(__dirname, './node_modules');
const srcDir = path.resolve(process.cwd(), 'src');
const distDir = path.resolve(process.cwd(), 'dist');
const plugins = [];
plugins.push(new CleanWebpackPlugin());
plugins.push(
    new CopyWebpackPlugin([
        {
            from: path.resolve(__dirname, '../src/common/js'), // 不打包直接输出的文件
            to: 'assets/' + 'static/js/', // 打包后静态文件放置位置
            ignore: ['.*'], // 忽略规则。（这种写法表示将该文件夹下的所有文件都复制）
        },
        {
            from: path.resolve(__dirname, '../src/language'),
            to: 'assets/' + 'language',
            ignore: ['.*'],
        },
    ])
);
plugins.push(new ExtractTextPlugin('./css/[hash][name].css'));
plugins.push(
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        'process.env.HOST': JSON.stringify(appConfig[process.env.NODE_ENV].apiHost),
        'process.env.APP_SITE': JSON.stringify(process.env.APP_SITE),
        'process.env.IMAGE_HOST': JSON.stringify(appConfig[process.env.NODE_ENV].imgHost),
        'process.env.IS_USE_HTTPS': JSON.stringify(appConfig[process.env.NODE_ENV].isUseHttps),
    })
);
// // 定义入口
var entries = function() {
    var jsDir = path.resolve(srcDir, 'js');
    var entryFiles = glob.sync(jsDir + '/*.{js,jsx}');
    var map = {};

    for (var i = 0; i < entryFiles.length; i++) {
        var filePath = entryFiles[i];
        var filename = filePath.substring(filePath.lastIndexOf('/') + 1, filePath.lastIndexOf('.'));
        map[filename] = filePath;
    }
    return map;
};
//html_webpack_plugins 定义
var html_plugins = function() {
    // 扫描所有views下的ejs文件
    var entryHtml = glob.sync(srcDir + '/views' + '/*.ejs');
    var r = [];
    var entriesFiles = entries();
    r.push(
        new HtmlWebpackPlugin({
            template: srcDir + '/index.ejs',
            filename: 'index.html',
            hash: true,
            chunks: ['vendors'],
        })
    );
    for (var i = 0; i < entryHtml.length; i++) {
        var filePath = entryHtml[i];
        var filename = filePath.substring(filePath.lastIndexOf('/') + 1, filePath.lastIndexOf('.'));
        var conf = {
            template: filePath,
            filename: 'pages/' + filename + '.html',
            // 防止浏览器缓存
            hash: true,
        };
        //如果和入口js文件同名
        if (filename in entriesFiles) {
            conf.inject = 'body';
            conf.chunks = ['vendors', filename, 'main'];
        }
        //跨页面引用，如pageA,pageB 共同引用了common-a-b.js，那么可以在这单独处理
        //if(pageA|pageB.test(filename)) conf.chunks.splice(1,0,'common-a-b')
        r.push(new HtmlWebpackPlugin(conf));
    }

    return r;
};
var config = {
    mode: process.env.NODE_ENV || 'production',
    devtool: '#cheap-module-eval-source-map',
    entry: Object.assign(
        {
            main: path.join(srcDir, 'main.js'),
        },
        entries()
    ),
    output: {
        path: distDir,
        publicPath: publicPath,
        filename: 'assets/' + 'js/[name]-[hash].js',
        chunkFilename: '[chunkhash:8].chunk.js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'postcss-loader'],
                }),
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'postcss-loader', 'less-loader'],
                }),
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: {
                            attrs: ['img:src', 'img:data-src'],
                            minimize: false,
                        },
                    },
                ],
            },
            {
                test: /\.(jpg|png|gif|eot|ttf|svg|woff|woff2)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        fallback: 'file-loader',
                        name: '[name].[ext]?[hash]',
                        outputPath: 'assets/' + 'images/',
                        limit: 8192,
                        esModule: false,
                    },
                },
            },
            // {
            //     test: /\.(jpg|png|gif|eot|ttf|svg)$/,
            //     use: {
            //         loader: 'file-loader',
            //         options:{
            //             name: '[name].[ext]',
            //             outputPath: "images/"
            //         }
            //     },
            // },
            { test: /\.(tpl|ejs)$/, use: 'ejs-loader' },

            // {
            //     loader: 'ejs-html-loader', // 使用 ejs-html-loader 处理 .ejs 文件的 includes 语法
            //     options: {
            //         production: process.env.ENV === 'production'
            //     }
            // }
        ],
    },
    devServer: {
        disableHostCheck: true,
        contentBase: path.resolve(__dirname, '../dist'),
        host: ip.address(),
        publicPath: publicPath,
        open: true, //自动打开浏览器
        hot: true, //热更新
        inline: true,
        port: 9000,
        proxy: {
            '/front/*': {
                target: 'https://m.test.whispark.com',
                changeOrigin: true,
                secure: false
            }
        }
    },
    plugins: plugins.concat(html_plugins()),
    // 分割代码 打包进vendors  chunks
    optimization: {
        splitChunks: {
            chunks: 'initial', //默认只作用于异步模块，为`all`时对所有模块生效,`initial`对同步模块有效
            minSize: 30000, //合并前模块文件的体积
            minChunks: 1, //最少被引用次数
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '~',
            cacheGroups: {
                vendor: {
                    filename: 'assets/' + 'common/[hash].js',
                    minChunks: 2,
                    name: 'vendors',
                    chunks: 'all',
                    priority: 10,
                },
                // default: {
                //     minChunks: 2,
                //     priority: 10,   // 优先级配置项
                //     reuseExistingChunk: true,
                //     enforce: true
                // }
                // styles: {
                //   name: 'styles',
                //   minChunks: 2,
                //   test: /\.less$/,
                //   chunks: 'all',
                //   enforce: true,
                // },
            },
        },
    },

    // resolve: {
    //     extensions: ['.js', '.css', '.scss', '.tpl', '.png', '.jpg'],
    //     // modules:[srcDir],
    //     alias:{
    //         '@':path.resolve(__dirname,'src')
    //     }
    // },
};
module.exports = config;
