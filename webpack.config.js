var path = require('path');

var SRC_DIR = path.join(__dirname, './client/source');

var DIST_DIR = path.join(__dirname, './client/dist');

module.exports = {
  mode: 'development',

  entry: `${SRC_DIR}/app.jsx`;

  output: {
    path: DIST_DIR;
    filename: 'bundle.js';
  }
}