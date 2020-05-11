const path = require('path');
const rootPath = path.resolve(__dirname);

module.exports = {
  resolve: {
    alias: {
      // For IDEs intellisense only
      '@': rootPath,
      '@@': rootPath,
      '~': rootPath,
      '~~': rootPath,
    },
  },
};
