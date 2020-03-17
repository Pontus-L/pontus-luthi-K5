let images = document.querySelectorAll("img");
let currentImage = 0;
let nextImageNumber = 1;

function nextImage(currentImage, nextImageNumber, images) {

    console.log("remove: " + currentImage);
    console.log("add: " + nextImageNumber);

    images[nextImageNumber].classList.add("showImage");

    setTimeout( () => {
        images[currentImage].classList.remove("showImage");
    }, 1300)
}

setInterval(() => {
    nextImage(currentImage, nextImageNumber, images)

    currentImage++;
    nextImageNumber++;

    if(currentImage == 3) {
        currentImage = 0;
    } 

    if(nextImageNumber == 3) {
        nextImageNumber = 0;
    }

}, 5000);