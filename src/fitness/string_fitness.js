// Compute the edit distance between the two given strings
module.exports = function(str1, target) {
  var fitness = 0;
  if (!str1.length || !target.length) {
    return 0;
  }

  for (var i = 0; i < target.length; i++) {
    if (!str1[i]) {
    	fitness += 256;
    	continue;
    }

    fitness += 256 - Math.abs(str1.charCodeAt(i) - target.charCodeAt(i));
  }

  return fitness;
};
