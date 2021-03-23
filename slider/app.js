// importing the resources
import { data } from "./data.js";

let audio = new Audio('music/k1.mp3');
audio.play();

// Selecting the DOM items
const people = document.querySelector('#people-section');
let counter = 1;
//DOM first Loaded with following HTML
document.addEventListener("DOMContentLoaded", () => {
    people.innerHTML = data.map((datum, id) => {
        const { head1, head2, head3, img, music } = datum;
        let position = "next";
        if (id === 0) {
            position = "active";
        }
        if (id === data.length - 1) {
            position = "last";
        }
        return `
                <article class="slider-container ${position}">
                    <h1 class="center headingId">${id}</h1>
                    <h1 class="center heading0">${datum.id}</h1>
                    <h2 class="center common-heading">${head1}</h2>
                    <h3 class="center common-heading">${head2}</h3>
                    <h4 class="center common-heading">${head3}</h4>
                    <img src=${img} class="img">
                </article>
                `;

    }).join("");
})

// Selecting the buttons after the contents of the DOM Loaded
const prevBtn = document.querySelector('.prevBtn');
const nextBtn = document.querySelector('.nextBtn');

// starter for slider for both right and left buttons
const startSlider = (type) => {
    if (counter < 5) {
        counter++;
    } else {
        counter = 2;
    }
    audio.src = `music/k${counter}.mp3`;
    setTimeout(() => {
        audio.play();
    }, 4000);
    const active = document.querySelector('.active');
    const last = document.querySelector('.last');
    let next = active.nextElementSibling;
    if (!next) {
        next = people.firstElementChild;
    }
    // Ressting the Classes
    active.classList.remove('active');
    last.classList.remove('last');
    if (type === "prev") {
        active.classList.add('next');
        last.classList.add('active');
        next = last.previousElementSibling;
        if (!next) {
            next = people.lastElementChild;
        }
        next.classList.remove('next');
        next.classList.add('last');
        return;
    }
    next.classList.remove('next');
    // Adding the Classes
    active.classList.add('last');
    last.classList.add('next');
    next.classList.add('active');
}

// When Previous Button Clicked
prevBtn.addEventListener('click', () => {
    startSlider("prev");
});

// When Next Button Clicked
nextBtn.addEventListener("click", () => {
    startSlider();
});
