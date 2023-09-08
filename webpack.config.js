module.exports = {
  mode: 'production',
  entry: {
    index: './src/index.js',
  },
  output: {
    path: __dirname + '/build',
    filename: '[name].bundle.js',
  },
  target: 'node',
  devServer: {
    contentBase: './build'
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'images/'
            }
          }
        ]
      }
    ]
  }
};
