/* Importing the Select Class */
import Select from './select.js';

const selectElements = document.querySelectorAll('[data-value]');

selectElements.forEach((selectElement) => {
    new Select(selectElement);
});
