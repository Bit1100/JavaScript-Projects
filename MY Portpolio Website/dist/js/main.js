const menuBtn = document.querySelector('.menu-btn');
const menuBtnSun = document.querySelector('.menu-btn__sun');
const nav = document.querySelector('.nav');
const menuNav = document.querySelector('.menu-nav');
const navItem = document.querySelectorAll('.menu-nav__item');
var showMenu = false;
menuBtn.addEventListener('click', toggleMenu);

function toggleMenu() {
    if (!showMenu) {
        menuBtnSun.classList.add('open');
        nav.classList.add('open');
        menuNav.classList.add('open');
        navItem.forEach((item) => item.classList.add('open'));

        showMenu = true;
    } else {
        menuBtnSun.classList.remove('open');
        nav.classList.remove('open');
        menuNav.classList.remove('open');
        navItem.forEach((item) => item.classList.remove('open'));
        showMenu = false;
    }
}