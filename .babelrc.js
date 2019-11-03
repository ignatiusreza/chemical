module.exports = {
  plugins: [
    ["@babel/plugin-proposal-decorators", { decoratorsBeforeExport: true }],
    "@babel/plugin-proposal-class-properties"
  ],
  presets: [
    [
      "@babel/preset-env",
      {
        loose: true,
        useBuiltIns: 'entry',
        corejs: 3,
      }
    ]
  ]
};
