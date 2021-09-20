const path = require('path')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const VueLoaderPlugin = require('vue-loader-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const isProd = process.env.NODE_ENV === 'production'

const config = {
	entry: './src/main.js',
	target: process.env.NODE_ENV = "production" ? "browserslist" : "web",
	devServer: {
		static: {
			publicPath: '/'
		},
		compress: true,
		hot: true
	},
	output: {
		filename: '[name].[chunkhash:8].bundle.js',
		path: path.resolve(__dirname, 'dist'),
		publicPath: './',
		clean: true
	},
	externals: {
		'vue': 'Vue',
		'vue-router': 'VueRouter',
	},
	resolve: {
		extensions: ['.js', '.vue'],
		alias: {
			'vue$': 'vue/dist/vue.esm.js',
			'@': path.resolve(__dirname, 'src'),
		}
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/, // 不编译node_modules下的文件
				loader: 'babel-loader',
			},
			{
				test: /\.vue$/,
				loader: 'vue-loader'
			},
			{
				test: /\.css$/,
				use: [
					'vue-style-loader',
					'css-loader'
				]
			},
			{
				test: /\.(gif|jpe?g|png|svg)$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 1024,
							name: '[name].[ext]'
						}
					}
				]
			},
			{
				test: /\.(woff)|(eot)|(ttf)$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 50000, //小于50K的 都打包
							name: '[chunkhash:8].[name].[ext]'
						}
					}
				]
			}
		]
	},
	plugins: [
		// 处理 .vue
		new VueLoaderPlugin(),
		new CleanWebpackPlugin(),
		// 输出 index.html 到 output
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: 'public/index.html',
			favicon: 'public/favicon.ico'
		}),
		new CopyWebpackPlugin({
			patterns: [
				{
					from: path.join(__dirname, 'static'),
					to: 'static'
				}
			]
		})
	],
	optimization: {
		minimizer: [
			new TerserPlugin({
				parallel: true,
				terserOptions: {
					// https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
				},
			}),
		],
		moduleIds: 'deterministic',
		usedExports: true,
		runtimeChunk: "single",
		splitChunks: {
			chunks: 'all'
		},
	}
}
if (!isProd) {
	config.devtool = 'eval-cheap-module-source-map' // 调试代码时可以看到自己原本的代码，而不是编译后的
} else {
	config.plugins.push(
		// 分离单独的 CSS 文件到 output
		new MiniCssExtractPlugin({
			filename: '[name].[hash].css',
		})
	)
}

module.exports = config
