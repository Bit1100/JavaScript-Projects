/* Importing the resources */
import { cards } from './data.js';

const container = document.querySelector('#container');

document.addEventListener('DOMContentLoaded', () => inject());
const inject = () => {
    container.innerHTML = cards.map((card, id) => {
        return `
        <div class="card">
            <div class="content">
                <h1>${card.head1}</h1>
                <h2>${card.head2}</h2>
                <p class="para">${card.para}
                </p>
                <a href="#">${card.link}</a>
            </div>
        </div>
        `;
    }).join("");
}