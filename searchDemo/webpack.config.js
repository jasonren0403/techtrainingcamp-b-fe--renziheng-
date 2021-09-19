const path = require('path')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const {VueLoaderPlugin} = require('vue-loader')
const TerserPlugin = require('terser-webpack-plugin')
const isProd = process.env.NODE_ENV === 'production'

const config = {
	entry: ['@babel/polyfill', './src/main.js'],
	devServer: {
		'static': path.join(__dirname, 'dist'), // html所在路径
		compress: true, // 是否压缩
		port: 3000, // 端口
		hot: true, // 热部署
		open: true, // 打包完成后自动打开网页
	},
	output: {
		filename: '[name].[chunkhash:8].js',
		path: path.join(__dirname, 'dist'),
		publicPath: './'
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
				// *.js
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
		splitChunks: {
			chunks: 'all'
		},
		moduleIds: 'deterministic'
	}
}
if (!isProd) {
	config.devtool = 'eval-cheap-module-source-map' // 调试代码时可以看到自己原本的代码，而不是编译后的
} else {
	config.plugins.push(
		// 分离单独的 CSS 文件到 output
		new MiniCssExtractPlugin({
			filename: 'style.css',
		})
	)
}

module.exports = config
