/**
 * Created by bmillar on 7/21/16.
 */
var imageList, imageIndex;
var target;

function nextImage(){
    imageIndex += 1;
    if(imageIndex == imageList.length-1){
        imageIndex = 0;
    }
    target = document.getElementById("img_carousel");
    target.innerHTML = "<img src='" + imageList[imageIndex] + "'>";


}

function setup() {
    imageList = [];
    imageList.push("images/Metropolis.jpg");
    imageList.push("images/Plan_9_from_Outer_Space.jpg");
    imageList.push("images/Vertigo.jpg");
    imageIndex = 0;
}
if (document.getElementById) {
    window.onload = setup;
}