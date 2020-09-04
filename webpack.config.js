module.exports = {
  mode: 'production',
  entry: {
    index: './src/index.js',
    service_worker: './src/service_worker.js',
  },
  output: {
    path: __dirname + '/build',
    filename: '[name].bundle.js',
  },

  target: 'node',
  devServer: {
    contentBase: '/home/sabrina/qaira dev/qAIRaMap-OpenSource/build',
  },
};
