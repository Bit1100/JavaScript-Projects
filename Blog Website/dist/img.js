const images = [
    { img: "./img/code1.png", },
    { img: "./img/code2.png", },
    { img: "./img/code4.jpg", },
    { img: "./img/code7.jpg", }
];

//Creating Variables
var currentItem = 0;
var shuffleImage = images.sort(() => Math.random() - .5);

//Selecting Classes
const imag = document.querySelector('.image');

document.addEventListener("DOMContentLoaded", () => {
    setImage();
    setInterval(() => {
        if (currentItem < images.length) {
            currentItem++;
        } else {
            currentItem = 0;
        }
        setImage();
    }, 2000);
});


function setImage() {
    var item = shuffleImage[currentItem];
    imag.src = item.img;
}