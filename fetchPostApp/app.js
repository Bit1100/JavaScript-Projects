const form = document.querySelector('#form');
const error = document.querySelector('.error');
const tbody = document.querySelector('.tbody');
const inputs = document.querySelectorAll('.input');


form.addEventListener('submit', function (e) {
    e.preventDefault();
    // Obsolote Way of Doing things - Content-Type-> multipart/formdata
    const formData = new FormData(this);
    // New Way of Doing Things - Content-Type-> x-www-form-urlenceded
    const searchParams = new URLSearchParams();
    for (const pair of formData) {
        searchParams.append(pair[0], pair[1]);
    }
    sendData(searchParams);
    inputs.forEach(input => input.value = '');
})


async function sendData(searchParams) {
    const myInit = {
        method: "POST",
        body: searchParams
    }

    try {
        const response = await fetch('insert.php', myInit);

        if (!response.ok) {
            throw Error(response.statusText);
        }

        const data = await response.json();

        showData(data);

    } catch (error) {
        console.log(error);
    }
}


showData = (data) => {
    tbody.innerHTML = data.map(datum => {
        const { id, name, password } = datum;
        return `
        <tr class="tr">
          <td class="td">${id}</td>
          <td class="td">${name}</td>
          <td class="td">${password}</td>
        </tr>
        `;
    }).join('');
}