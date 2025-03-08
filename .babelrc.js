module.exports = { 
  presets: [
    [
      'module:metro-react-native-babel-preset', 
      { 
        useTransformReactJSXExperimental: true 
      }
    ],
    'babel-preset-expo',
    '@babel/preset-react'    
  ], 
  plugins: [
    ['@babel/plugin-transform-react-jsx', { runtime: 'automatic' }],
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
        },
      },
    ],
  ],
};
