module.exports = function override(config, env) {
  config.resolve = {
    ...config.resolve,
    fallback: {
      util: require.resolve('util/'),
    },
  };

  return config;
};
