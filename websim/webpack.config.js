const path = require('path');

module.exports = {
  entry: {
    websim: './websim.js',
    editor: './editor.js'
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].bundle.js',
    publicPath: '/build/'
  },
  resolve: {
    extensions: ['.js']
  },
  devServer: {
    host: '0.0.0.0',
    port: '8080',
    inline: true
  },
  module:{
    rules: [
      {
        test: /(\.js|.jsx)$/,
        loader: 'babel-loader',
        exclude: "/node_modules/"
      }
    ]
  },
  mode: 'development'
}
