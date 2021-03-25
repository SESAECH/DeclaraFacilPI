const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
//const InlineChunkHtmlPlugin = require('react-dev-utils/InlineChunkHtmlPlugin');
//const MiniCssExtractPlugin = require('mini-css-extract-plugin');
//const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


module.exports = {
  entry:['./src/js/main.js'],
  output: {
	path: `${__dirname}/dist`,
	filename: 'bundle.js',
  },
  mode:'development',
  target:'web',
  performance: {
    maxAssetSize: 10485760,  //10Mb
    maxEntrypointSize: 7340032, //7 Mb
    hints: 'warning'
  },
  devServer: {
    contentBase:'./dist/',
    publicPath:'/live/',
    hot:true,
    open: true,
    inline:true,
    hotOnly: true,
    watchContentBase:true,
  },
  devtool:'inline-source-map',
  plugins:[ 
    new webpack.ProvidePlugin({ $: "jquery", jQuery: 'jquery','window.jQuery': 'jquery'}),
//    new webpack.optimize.LimitChunkCountPlugin({maxChunks:1,}),
    new HtmlWebpackPlugin({inject:true,template:'./src/declaraFacilPI.html', filename:'Declarafacil.html'}),
    //new MiniCssExtractPlugin(),
    //new BundleAnalyzerPlugin(),
    //new InlineChunkHtmlPlugin(HtmlWebpackPlugin,[/bundle/])
  ],
  module:{
  	rules:[{
  		test:/\.js$/,
  		exclude: /node_modules/,
  		use:{loader: 'babel-loader',}
  	},
  	{
  	    test:/\.css$/i,
  	    use:[//MiniCssExtractPlugin.loader,
  	    'style-loader','css-loader']
  	}]
  },
  optimization:{
  	minimize:true,
    minimizer: [new TerserPlugin({extractComments:false,}), //new OptimizeCssAssetsPlugin(),
    ]
  }
}
