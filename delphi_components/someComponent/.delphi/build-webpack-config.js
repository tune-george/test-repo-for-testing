var ExtractTextPlugin = require("extract-text-webpack-plugin");
var webpack = require('webpack');
var path = require('path');
var cwd = process.cwd();
var merge = require('lodash').merge;

var defaultConfig = {
  'resolve' : {
    'alias' : {
      'base_styles' : path.join(cwd, 'delphi', 'node_modules', 'matstyle', 'less'),
      'components'  : path.join(cwd, 'delphi_components')
    },
    'extensions' : ['', '.js', '.jsx', '.es6.js']
  },
  'resolveLoader' : {
    'modulesDirectories' : [
      "web_loaders",
      "web_modules",
      "node_loaders",
      "node_modules",
      path.join(cwd, 'delphi', 'node_modules'),
      path.join(cwd, 'delphi', 'web_loaders')
    ]
  },
  'module' : {
    'loaders' : [{
      'test'   : /\.jsx$/,
      'loader' : 'jsx-loader?harmony'
    }]
  },
  'plugins' : []
};

module.exports = function(base, options) {
  if (!options) { options = {}; }
  var cssRE = /\.css$/;
  var lessRE = /\.less$/;
  var cssLoaders = options.production ? ['css?minimize'] : ['css'];
  var lessLoaders = cssLoaders.concat([
    'autoprefixer?browsers=last 2 version',
    'remove-less-silent-placeholders',
    'less?strictMath=on',
    'prepend-less-imports'
  ]);

  if (options.production) {
    cssLoaders = ExtractTextPlugin.extract("style-loader", cssLoaders.join('!'));
    lessLoaders = ExtractTextPlugin.extract("style-loader", lessLoaders.join('!'));

    defaultConfig.plugins.push(new webpack.optimize.UglifyJsPlugin());

    defaultConfig.plugins.push(
      new ExtractTextPlugin("styles.css", {
        'allChunks' : true
      })
    );
  } else {
    cssLoaders = ['style-loader'].concat(cssLoaders).join('!');
    lessLoaders = ['style-loader'].concat(lessLoaders).join('!');
  }

  defaultConfig.module.loaders = defaultConfig.module.loaders.concat([{
    'test'   : lessRE,
    'loader' : lessLoaders
  }, {
    'test'   : cssRE,
    'loader' : cssLoaders
  }]);

  return merge(base, defaultConfig, function(a, b) {
    if (Array.isArray(a) && Array.isArray(b)) {
      return a.concat(b);
    } else {
      return undefined;
    }
  });
};