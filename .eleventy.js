const UpgradeHelper = require('@11ty/eleventy-upgrade-help');

module.exports = (config) => {
  config.addPlugin(UpgradeHelper);

  config.addPassthroughCopy('src/css');
  config.addPassthroughCopy('src/images');
  config.addPassthroughCopy('src/js');

  return {
    dir: {
      input: 'src',
    },
  };
};
