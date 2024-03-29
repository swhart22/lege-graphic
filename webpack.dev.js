const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require("./webpack.common.js");

module.exports = merge(common, {
	devtool: 'inline-source-map',
	devServer:{
		contentBase: './dist',
		port: 3000
	}, 
  plugins: [
    new webpack.DefinePlugin({
      'ENV': JSON.stringify('development')
    })
  ]
});