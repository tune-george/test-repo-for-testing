var cssbyebye = require('css-byebye');

module.exports = function(content) {
  var result = cssbyebye.process(content, {
    'rulesToRemove' : [/.*\.e-.*/],
    'map'           : false
  });
  return result.css;
}
