/* Importing the Resources */
import resources from './data.js';
const container = document.querySelector('#container');

document.addEventListener('DOMContentLoaded', cards());
function cards() {
    resources.forEach(resource => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
        <div class="front">
            <p class="para center">${resource.front}</p>
        </div>
        <div class="back">
            <p class="para center">${resource.back}</p>
        </div>
        `;
        container.appendChild(card);
    })
}