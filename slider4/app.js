let audio = new Audio('music/k1.mp3');
audio.play();


// Selecting the DOM items
const contents = document.querySelector('#contents');
const container = document.querySelector('.container');
const btnWrapper = document.querySelector('.btn-wrapper');
const bideoStarter = document.querySelector('.bideo-starter');
let counter = 1;

//By Default, Hiding the Click Me Button
btnWrapper.classList.add('hide');
bideoStarter.classList.add('hide');
container.classList.add('hide')

//Unhiding the Click Me Button
setTimeout(() => {
    btnWrapper.classList.remove('hide')
    bideoStarter.classList.remove('hide')
}, 6000)

//DOM first Loaded with following HTML
bideoStarter.addEventListener("click", fetchData);

//Request and Fetching Data Function from the Server in a AJAX Way
function fetchData() {
    bideoStarter.classList.add('hide');
    btnWrapper.classList.add('hide');
    container.classList.remove('hide')

    // Creating the xhr object
    const xhr = new XMLHttpRequest();

    //Initializing the Request to send the data to server
    xhr.open('GET', "./phpcores/retrieve.php", true);

    //Processing the Data
    xhr.onprogress = () => {
        console.log("Processing")
    }

    // Contents on Loading from the Server
    xhr.onload = () => {
        if (xhr.status === 200) {
            data = JSON.parse(xhr.responseText);
            contents.innerHTML = data.map((datum, id) => {
                const { id_name, heading1, heading2, heading3, image } = datum;
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
                             <h1 class="center heading0">${id_name}</h1>
                             <h2 class="center common-heading">${heading1}</h2>
                             <h3 class="center common-heading">${heading2}</h3>
                             <h4 class="center common-heading">${heading3}</h4>
                             <img src=${image} class="img">
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
        } else {
            console.log("Something Went Wrong")
        }
    }

    //Sending the Data to Server
    xhr.send();
}

// Selecting the buttons after the contents of the DOM Loaded
const prevBtn = document.querySelector('.prevBtn');
const nextBtn = document.querySelector('.nextBtn');

// Reset Function
const resetFunction = () => {
    const articles = Array.from(contents.children);
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
    counter < 5 ? counter++ : counter = 2;
    audio.src = `music/k${counter}.mp3`;
    setTimeout(() => {
        audio.play();
    }, 4000);
    if (!next) {
        next = contents.firstElementChild;
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
            next = contents.lastElementChild;
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