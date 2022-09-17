const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

config.resolver = {
  /* resolver options */
  sourceExts: ['jsx', 'js', 'ts', 'tsx', 'cjs'],
};

module.exports = config;
