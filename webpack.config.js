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

};
