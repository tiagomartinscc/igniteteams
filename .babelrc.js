const plugins = [
  [
    require.resolve('babel-plugin-module-resolver'),
    {
      root: ["./src/"],
      alias: {
        '@assets': './src/assets',
        '@components': './src/components',
        '@routes': './src/routes',
        '@screens': './src/screens',
        '@storage': './src/storage',
        '@utils': './src/utils',
      }
    }
  ]
];

const presets = [
  'babel-preset-expo',
  '@babel/preset-react'
];

module.exports = { presets, plugins };