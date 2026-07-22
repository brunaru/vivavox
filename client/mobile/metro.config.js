const exclusionList = require('metro-config/src/defaults/exclusionList');

module.exports = {
  resolver: {
    blockList: exclusionList([
      /android\/app\/build\/intermediates\/cxx\/.*/,
      /android\/\.cxx\/.*/,
      /node_modules\/react-native-reanimated\/android\/\.cxx\/.*/,
    ]),
  },
};