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
        const { head1, head2, head3, img } = datum;
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
    const active = document.querySelector('.active');
    const activeChildren = Array.from(active.children);
    activeChildren.forEach(child => {
        if (!child.classList.contains('img')) {
            child.style.display = "block";
        }
    });
})

// Selecting the buttons after the contents of the DOM Loaded
const prevBtn = document.querySelector('.prevBtn');
const nextBtn = document.querySelector('.nextBtn');

// Reset Function
const resetFunction = () => {
    const articles = Array.from(people.children);
    articles.forEach(article => {
        const articleChildren = Array.from(article.children);
        articleChildren.forEach(child => {
            if (!child.classList.contains('img')) {
                child.style.display = "none";
            }
        })
    });
}

// starter for slider for both right and left buttons
const startSlider = (type) => {
    const active = document.querySelector('.active');
    const last = document.querySelector('.last');
    let next = active.nextElementSibling;
    if (counter < 5) {
        counter++;
    } else {
        counter = 2;
    }
    audio.src = `music/k${counter}.mp3`;
    setTimeout(() => {
        audio.play();
    }, 5000);
    if (!next) {
        next = people.firstElementChild;
    }
    if (next.classList.contains('next')) {
        const nextChildren = Array.from(next.children);
        resetFunction();
        setTimeout(() => {
            nextChildren.forEach(child => {
                if (!child.classList.contains('img')) {
                    child.style.display = "block";
                }
            });
        }, 3000);
    }
    // Reseting the Classes
    active.classList.remove('active');
    last.classList.remove('last');
    if (type === "prev") {
        active.classList.add('next');
        last.classList.add('active');
        next = last.previousElementSibling;
        if (!next) {
            next = people.lastElementChild;
        }
        if (next.classList.contains('next')) {
            const lastChildren = Array.from(last.children);
            resetFunction();
            lastChildren.forEach(child => {
                if (!child.classList.contains('img')) {
                    child.style.display = "block";
                }
            });
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
