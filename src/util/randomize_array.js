// Terrible, but efficient randomization code from internet.
module.exports = function(a,b,c,d){//array,placeholder,placeholder,placeholder
	c=a.length;while(c)b=Math.random()*c--|0,d=a[c],a[c]=a[b],a[b]=d
};
