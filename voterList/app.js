class Voter {
    constructor(name, phone, age, city) {
        this.name = name;
        this.phone = phone;
        this.age = age;
        this.city = city;
    }
}

class VoterList {
    addVoter(voter) {
        const list = document.querySelector('.voterlist');
        const row = document.createElement('tr');
        row.classList.add('tr');
        row.innerHTML = `
        <td class='td'>${voter.name}</td>
        <td class='td'>${voter.phone}</td>
        <td class='td'>${voter.age}</td>
        <td class='td'>${voter.city}</td>
        <td class="td"><a href="" class="editbtn">E</a></td>
        <td class="td"><a href="" class="delbtn">&times;</a></td>
        `;
        list.appendChild(row);
    }
    showAlert(msg, classname) {
        const div = document.createElement('div');
        div.className = `alert ${classname}`;
        div.appendChild(document.createTextNode(msg));
        const container = document.querySelector('.container');
        const form = document.querySelector('#form');
        container.insertBefore(div, form);
        setTimeout(() => {
            document.querySelector('.alert').remove();
        }, 3000);
    }
    deleteVoter(target) {
        target.closest('.tr').remove();
    }
    editVoter(target) {
        const tr = target.closest('.tr');
        const tdCollection = Array.from(tr.children);
        const inputs = document.querySelectorAll('input');
        let counter = 0;
        inputs.forEach(input => {
            if (input.value !== 'Submit') {
                input.value = tdCollection[counter++].innerText;
            }
        })
    }
    clear() {
        const inputs = document.querySelectorAll('input');
        inputs.forEach(input => {
            if (input.value !== 'Submit') {
                input.value = '';
            }
        })
    }
}
//Submit Clicked
const form = document.querySelector('#form');
form.addEventListener('submit', () => {
    let name = document.querySelector("[name='name']").value;
    let phone = document.querySelector("[name='phone']").value;
    let age = document.querySelector("[name='age']").value;
    let city = document.querySelector("[name='city']").value;
    voter = new Voter(name, phone, age, city);
    voterListObj = new VoterList();
    if (name === "" || phone === "" || age === "" || city === "") {
        voterListObj.showAlert('Please Fill in All Fields', 'failure');
    } else {
        voterListObj.addVoter(voter);
        voterListObj.showAlert("Voter Added Successfully", "success");
        voterListObj.clear();
    }
    e.preventDefault();
})

//Delete Button Clicked
const voterlist = document.querySelector('.voterlist');
voterlist.addEventListener('click', e => {
    voterListObj = new VoterList();
    if (e.target.classList.contains('delbtn')) {
        voterListObj.deleteVoter(e.target);
        voterListObj.showAlert('Voter Removed', 'success');
    }
    if (e.target.classList.contains('editbtn')) {
        voterListObj.editVoter(e.target);
        voterListObj.showAlert('Voter About to be Edited', 'success');
    }
    e.preventDefault();
})
