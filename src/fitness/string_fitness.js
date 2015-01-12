// Compute the edit distance between the two given strings
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
    fitness += /*256 - */Math.abs(str1.charCodeAt(i) - target.charCodeAt(i));
    //console.log('Step is:', fitness)
  }
//console.log('NEW FIT', fitness)
  return (256*target.length) - fitness;
};

//console.log('Fitness is (ÿ): ', module.exports('ÿÿÿÿÿÿÿÿÿÿÿ', 'Hello world'));
//console.log('Fitness is (H): ', module.exports('Hello world', 'Hello world'));
