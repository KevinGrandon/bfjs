// Compute the edit distance between the two given strings
module.exports = function(str1, str2) {
  var fitness = 0;
  if (!str1.length || !str2.length) {
    return 0;
  }

  for (var i = 0; i < str2.length; i++) {
    if (!str2[i] || !str1[i]) { continue; }

    fitness += 256 - Math.abs(str2.charCodeAt(i) - str1.charCodeAt(i));
  }
  return fitness;
};
