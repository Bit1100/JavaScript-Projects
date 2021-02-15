/* It's a Class which defines the custom select element*/
/* Main Functionality */
export default class Select {
    // Creating the Elements
    constructor(element) {
        this.element = element;
        this.options = getFormattedOptions(element.querySelectorAll('option'));
        this.customElement = document.createElement('div');
        this.customLabel = document.createElement('span');
        this.customElementOptions = document.createElement('ul');
        setupCustomSelect(this);
        element.after(this.customElement);
        element.style.display = "none";
    }

    get selectedOption() {
        // Getting the selected option
        return this.options.find(option => option.selected);
    }

    get selectedOptionIndex() {
        // Getting the selected option index
        return this.options.indexOf(this.selectedOption);
    }

    selectValue(value) {
        // Select the new option for the custom_select_label
        const newSelectedOption = this.options.find(option => {
            return option.value === value;
        });
        const prevSelectedOption = this.selectedOption;
        prevSelectedOption.selected = false;
        prevSelectedOption.element.selected = false;

        newSelectedOption.selected = true;
        newSelectedOption.element.selected = true;

        this.customLabel.innerHTML = newSelectedOption.label;

        this.customElementOptions.querySelector(`[data-value="${prevSelectedOption.value}"]`).classList.remove('selected');

        const newCustomElement = this.customElementOptions.querySelector(`[data-value="${newSelectedOption.value}"]`)

        newCustomElement.classList.add('selected');

        newCustomElement.scrollIntoView({ block: "nearest" });
    }
}

let debounceTimeout;
let searchTerm = '';
const setupCustomSelect = (select) => {
    // Setup for custom_select
    select.customElement.classList.add('custom-select-container');
    select.customElement.tabIndex = 0;

    // Setup for custom_select_label
    select.customLabel.classList.add('custom-select-value');
    select.customLabel.innerHTML = select.selectedOption.label;
    select.customElement.append(select.customLabel);

    // Setup for custom_select_options
    select.customElementOptions.classList.add('custom-select-options');
    select.options.forEach(option => {
        // Setup for each custom_select_option
        const optionElement = document.createElement('li');
        optionElement.classList.add('custom-select-option');
        optionElement.classList.toggle('selected', option.selected);
        optionElement.innerHTML = option.label;
        optionElement.dataset.value = option.value;
        optionElement.addEventListener('click', () => {
            select.selectValue(option.value);
            select.customElementOptions.classList.remove('show');
        })
        select.customElementOptions.append(optionElement);
    });

    select.customElement.append(select.customElementOptions);

    // Various Event Listener for various Jobs
    /* Click Event for Label */
    select.customLabel.addEventListener('click', () => {
        select.customElementOptions.classList.toggle('show');
    })

    /* Blur Event for hiding the optionContainer  */
    select.customElement.addEventListener('blur', () => {
        select.customElementOptions.classList.remove('show');
    });

    /* KeyDown Event for Propagating into the options */
    select.customElement.addEventListener('keydown', (e) => {
        switch (e.code) {
            // For Toggling the Option List
            case 'Space':
                {
                    select.customElementOptions.classList.toggle('show');
                    break;
                }
            // For transversing upward
            case 'ArrowUp':
                {
                    const prevOption = select.options[select.selectedOptionIndex - 1]
                    if (prevOption) {
                        select.selectValue(prevOption.value);
                    }
                    break;
                }
            // For transversing downward
            case 'ArrowDown':
                {
                    const nextOption = select.options[select.selectedOptionIndex + 1]
                    if (nextOption) {
                        select.selectValue(nextOption.value);
                    }
                    break;
                }
            // For minimizing the options
            case 'Enter':
            case "Escape":
                {
                    select.customElementOptions.classList.remove('show');
                }

            // For Searching the Options Directly
            default:
                {
                    clearTimeout(debounceTimeout);
                    searchTerm += e.key;
                    debounceTimeout = setTimeout(() => {
                        searchTerm = '';
                    }, 500);
                    const searchOption = select.options.find(option => {
                        return option.label.toLowerCase().startsWith(searchTerm);
                    })
                    if (searchOption) {
                        select.selectValue(searchOption.value);
                    }
                    break;
                }
        }
    })
}

const getFormattedOptions = (options) => {
    return [...options].map((option) => {
        return {
            value: option.value,
            label: option.label,
            selected: option.selected,
            element: option,
        }
    })
}