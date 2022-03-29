const path = require('path');

module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  staticDirs: ["../public"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  features: {
    postcss: false,
  },
  framework: "@storybook/react",
  core: {
    builder: "webpack4",
  },
  // Use the webpack configuration provided by Storybook's ds
  // https://storybook.js.org/docs/react/configure/webpack
  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.s?css$/,
      use: ['style-loader', 'css-loader', 'sass-loader'],
      include: path.resolve(__dirname, '../'),
    });

    return config;
  },
};
