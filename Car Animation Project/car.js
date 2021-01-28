var car1 = document.querySelector('.car1');
var car2 = document.querySelector('.car2');
var car3 = document.querySelector('.car3');

var audio = new Audio('sound.mp3');
audio.loop = true;

audiogo2 = new Audio('genda.mp3');
audio.loop = true;

audiogo = new Audio('tera.mp3');
audio.loop = true;
audio.play();
document.onkeydown = function(e) {

    if (e.keyCode == 38) {
        car1x = parseInt(window.getComputedStyle(car1, null).getPropertyValue('bottom'));
        car1.style.bottom = car1x + 20 + "px";
    }
    if (e.keyCode == 40) {
        car1x = parseInt(window.getComputedStyle(car1, null).getPropertyValue('bottom'));
        car1.style.bottom = (car1x - 20) + "px";
    }
    if (e.keyCode == 39) {
        car1x = parseInt(window.getComputedStyle(car1, null).getPropertyValue('left'));
        car1.style.left = car1x + 20 + "px";
    }
    if (e.keyCode == 37) {
        car1x = parseInt(window.getComputedStyle(car1, null).getPropertyValue('left'));
        car1.style.left = (car1x - 20) + "px";
    }

};


setInterval(() => {
    c1x = parseInt(window.getComputedStyle(car1, null).getPropertyValue('left'));
    c1y = parseInt(window.getComputedStyle(car1, null).getPropertyValue('bottom'));

    c2x = parseInt(window.getComputedStyle(car2, null).getPropertyValue('left'));
    c2y = parseInt(window.getComputedStyle(car2, null).getPropertyValue('bottom'));

    c3x = parseInt(window.getComputedStyle(car3, null).getPropertyValue('left'));
    c3y = parseInt(window.getComputedStyle(car3, null).getPropertyValue('bottom'));

    offsetX = Math.abs(c1x - c2x);
    offsetY = Math.abs(c1y - c2y);

    offsetXX = Math.abs(c1x - c3x);
    offsetYY = Math.abs(c1y - c3y);

    // console.log(offsetX, offsetY)
    // console.log(offsetXX, offsetYY)
    if (offsetX < 50 && offsetY < 40) {
        audiogo.play();
        audio.pause();
        setTimeout(() => {
            audiogo.pause();
            audio.play();
        }, 5000);
    } else if (offsetXX < 300 && offsetYY < 80) {
        audiogo2.play();
        audio.pause();
        setTimeout(() => {
            audiogo2.pause();
            audio.play();
        }, 5000);
    }
}, 500);