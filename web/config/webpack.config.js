const path = require('path')

/** @returns {import('webpack').Configuration} Webpack Configuration */
module.exports = (config, { mode }) => {
  if (mode === 'development') {
    // Add dev plugin
  }
  config.resolve = {
    ...config.resolve,
    alias: {
      ...config.resolve.alias,
      '@ui': path.resolve(__dirname, '../src/components/ui'),
    },
  }
  // Add custom rules for your project
  // config.module.rules.push(YOUR_RULE)

  // Add custom plugins for your project
  // config.plugins.push(YOUR_PLUGIN)

  return config
}
