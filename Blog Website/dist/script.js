const cross = document.querySelector('.menu-btn');
const crossBtn = document.querySelector('.menu-btn__cross');
const nav = document.querySelector('.nav');
const menuNav = document.querySelector('.menu-nav');
const navItem = document.querySelectorAll('.menu-nav__item');


var showMenu = false;

cross.addEventListener('click', toggleMenu);

function toggleMenu() {
    if (!showMenu) {
        crossBtn.classList.add('open');
        nav.classList.add('open');
        menuNav.classList.add('open');
        navItem.forEach((item) => item.classList.add('open'));

        showMenu = true;
    } else {
        crossBtn.classList.remove('open');
        nav.classList.remove('open');
        menuNav.classList.remove('open');
        navItem.forEach((item) => item.classList.remove('open'));
        showMenu = false;
    }
}