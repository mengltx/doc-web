const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const vueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
    mode: "development",
    entry: {
        index: './src/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].[hash:8].js'
    },
    module: {
        rules: [

            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015', 'stage-3'],
                        plugins: ['transform-runtime', 'syntax-dynamic-import']
                    }
                }
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../' //  特别重要，否则css文件打包后其中引用的图片文件不正确
                        }
                    },
                    'css-loader'
                ]
            },
            {
                test: /\.html$/,
                use: {
                    loader: 'html-loader',
                }

            },
            {
                test: /\.(png|jpg|gif|jpeg|svg|eot|woff|woff2|ttf)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: 'img/.[name].[hash:5].[ext]',
                            limit: 1024,//b
                            publicPath: '../'
                        }
                    }
                ]
            },
            {
                test: /\.vue$/,
                use: 'vue-loader',

            }
        ]
    },

    plugins: [

        new MiniCssExtractPlugin({
            filename: "css/.[name].[hash:8].css",
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: './index.html',
            hash: false,
            chunks: ['index']
        }),
        new vueLoaderPlugin(),
        new webpack.ProvidePlugin({
            Vue: ['vue/dist/vue.esm.js', 'default'],
            VueRouter: ['vue-router/dist/vue-router.esm.js', 'default'],
            mavonEditor:'mavon-editor'
            
        })
    ],
    devServer: {
        contentBase: path.resolve(__dirname, "../dist/"),
        index: './index.html',
        historyApiFallback: true,
        quiet: false,
        noInfo: false,
        hot: true,
        inline: true,
        lazy: false,
        progress: true,
        host: '127.0.0.1',
        port: '8081',
        proxy: {
            '/doc-api': {
                target: 'http://localhost:8080',
                pathRewrite: { '^/doc-api': '' },
                changeOrigin: true,
                secure: false
            }
        }
    }

};