var score = 0;
var cross = true;

var audio = new Audio('resources/music.mp3');
var audiogo = new Audio('resources/gameover.mp3');

setTimeout(() => {
    audio.play()
}, 1000);

document.onkeydown = function(e) {
    // console.log("Key code is: ", e.keyCode)
    var dino = document.querySelector('.dino');
    if (e.keyCode == 32) {
        dino.classList.add('animateDino');
        setTimeout(() => {
            dino.classList.remove('animateDino')
        }, 700);
    }
    if (e.keyCode == 39) {
        dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left = dinoX + 112 + "px";
    }
    if (e.keyCode == 37) {
        dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left = (dinoX - 112) + "px";
    }

};

setInterval(() => {
    var gameOver = document.querySelector('.gameOver');
    var dino = document.querySelector('.dino');
    var obstacle = document.querySelector('.obstacle');

    dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
    dy = parseInt(window.getComputedStyle(dino, null).getPropertyValue('top'));

    ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));
    oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('top'));

    offsetX = Math.abs(dx - ox);
    offsetY = Math.abs(dy - oy);
    // console.log(offsetX, offsetY)
    if (offsetX < 73 && offsetY < 52) {
        gameOver.innerHTML = "Game Over - Reload to Play Again";
        obstacle.classList.remove('obstacleAni');
        audiogo.play();
        audio.pause();
        setTimeout(() => {
            audiogo.pause();
        }, 700);
    } else if (offsetX < 145 && cross) {
        score += 1;
        updateScore(score);
        cross = false;
        setTimeout(() => {
            cross = true;
        }, 1000);
        setTimeout(() => {
            aniDur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'));
            newDur = aniDur - 0.1;
            obstacle.style.animationDuration = newDur + 's';
        }, 500);

    }

}, 10);

function updateScore(score) {
    scoreCont.innerHTML = "Your Score: " + score
}