"use strict";


var imageList= ["black_rice.png","macaroni.png","soup_joumou.png","logo.png","tassot.png","interior.png"];
var i = 0;
setInterval(changeImg, 500);
function changeImg() {

	document.getElementById("display").src = (imageList[i%imageList.length]);
	i++;
}





/*

Have big image
use getElementById to select the img element -> replace it with another image

possibly put the images into an array


*/
