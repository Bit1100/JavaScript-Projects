/* Images Section */
images = [
    { img: "img/code3.jpg" },
    { img: "img/code4.jpg" },
    { img: "img/code2.png" },
    { img: "img/blog.jpg" },
    { img: "img/blog2.jpg" },
    { img: "img/Bit.jpg" },
    { img: "img/about.jpg" },
    { img: "img/about2.jpg" },
    { img: "img/logo2.jpg" },
];

/* Selection of DOM Elemnets */
const current = document.querySelector('#current');
const imgGallery = document.querySelector('#img-gallery');
let opacity = .5;

/* Randomizing the Images */
images = images.sort(() => Math.random() - .5);

/* After Images Uploaded on the Browsers */
images.forEach(image => {
    let img = document.createElement('img');
    img.classList.add('image');
    img.setAttribute('src', `${image.img}`);
    imgGallery.appendChild(img);
});;

/* Selecting the firstChild from the DOM */
const firstChildElement = imgGallery.firstElementChild;
firstChildElement.style.opacity = opacity;
current.src = firstChildElement.src;

/* Clicking on any image will display into the current section */
const imgs = document.querySelectorAll('.image');
imgs.forEach(img => {
    img.addEventListener('click', (e) => {
        /* Reseting the opacity for all the images*/
        imgs.forEach(img => (img.style.opacity = 1))
        current.src = e.target.src;
        current.classList.add('fade-in');
        setTimeout(() => current.classList.remove('fade-in'), 500);
        e.target.style.opacity = opacity;
    })
})