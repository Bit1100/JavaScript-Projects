var character = ["Hero", 'Villain', "Heroine"];
var car = document.querySelectorAll('.car');
var count = 0;



var add = () => {
    return `
    <div class="character">${character[count++]}</div>
    <div class="wheel1"><img src="wheel2.png"></div>
    <div class="wheel2"><img src="wheel2.png"></div>
    `
};


car.forEach((item) => {
    item.innerHTML = add();
});