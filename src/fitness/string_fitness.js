/**
 * Compute the edit distance between the two given strings
 * @param {String} str1 The provided string.
 * @param {String} target The target string.
 */
module.exports = function(str1, target) {
  var fitness = 0;
  if (!str1.length || !target.length) {
    return 0;
  }

  for (var i = 0; i < target.length; i++) {
    if (!str1[i] ) {
      fitness += 256;
      continue;
    }
    fitness += Math.abs(str1.charCodeAt(i) - target.charCodeAt(i));
  }
  var fitness = (256 * target.length) - fitness;

  if (fitness === (256 * target.length)) {
    fitness += (target.length - Math.abs(target.length - str1.length));
  }

  return fitness;
};
