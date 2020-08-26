const path = require('path');

module.exports = {
  src: path.resolve(__dirname, '../src'), // source files
  assets: path.resolve(__dirname, '../src/assets'), // assets files
  build: path.resolve(__dirname, '../../public'), // production build files
  static: path.resolve(__dirname, '../../static'), // static files to copy to build folder
};
