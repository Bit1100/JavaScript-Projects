// Importing the data from another file
import data from './data.js';

// WHen DOM Loaded make an AJAX request using fetch library.
document.addEventListener('DOMContentLoaded', () => sendFileData());

// Making an AJAX call via fetch() library using async and await
async function sendFileData() {
    const init = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",  // sent request
            "Accept": "application/json"   // expected data sent back
        },
        body: JSON.stringify(data)
    }
    try {
        const response = await fetch('insert.php', init);

        const msg = await response.json();

        console.log(msg);

        // Object Destructuring
        const { success, error, infos } = msg;

        if (success) {
            for (let i = 0; i < infos.length; i++) {
                document.body.innerText += `${infos[i]['heading']}=>${infos[i]['content']} \n`;
            }
        } else {
            document.body.innerText = error;
        }
    } catch (error) {
        document.body.innerHTML = error;
    }
}