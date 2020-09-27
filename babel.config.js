module.exports = {
  presets: [
    [
      '@babel/preset-env',
      // {
      //     "useBuiltIns": "entry"
      //   },
      {
        targets: {
          node: 'current',
          chrome: '65',
          safari: '12',
          firefox: '60',
          opera: '60',
          android: '7.0',
          ios: '12.4',
        },
      },
    ],
  ],
};
