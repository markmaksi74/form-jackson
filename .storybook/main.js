module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "storybook-addon-sass-postcss"
  ],
  features: {
    postcss: false,
  },
  framework: "@storybook/react",
  typescript: {
    reactDocgen: false,
  },
  core: {
    builder: 'webpack5',
  },
  staticDirs: ['../images']
};
