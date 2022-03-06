// generate HTML table from JS objects
function dataToHtml(dataObjects) {
    let html = `
                <table>
                <tr>
                    <th>Name</th>
                    <th>Info</th>
                    <th>Points</th>
                </tr>
                `;
    const l = dataObjects.length;
    for (let i = 0; i < l; i++) {
        const dataObject = dataObjects[i];
        let points = dataObject.exercise_points;

        // change bg color of table rows here if points less than 50
        if (points < 50 && points !== null) {
            html += `
            <tr class="redpoints">
                <td style="text-align: left;">${dataObject.name}</td>
                <td style="text-align: center;">${dataObject.info}</td>
                <td style="text-align: right;">${dataObject.exercise_points}</td>
            </tr>
            `
        }
        // change null to dash
        else if (points === null) {
            html += `
            <tr class="redpoints">
                <td style="text-align: left;">${dataObject.name}</td>
                <td style="text-align: center;">${dataObject.info}</td>
                <td style="text-align: right;">–</td>
            </tr>
            `
        }
        else {
        html += `
                <tr>
                    <td style="text-align: left;">${dataObject.name}</td>
                    <td style="text-align: center;">${dataObject.info}</td>
                    <td style="text-align: right;">${dataObject.exercise_points}</td>
                </tr>
                `
        }
    }
    html += '</table>'
    return html;
}

// run 'npx json-server -H localhost -p 3010 -w db.json'
const DATA_SOURCE = 'http://127.0.0.1:3010/students'

// using Fetch API
function listAll() {
    fetch(DATA_SOURCE).then(response => {return response.json()})
    .then(data => {
        const elem = document.getElementById("listall");
        elem.innerHTML = dataToHtml(data);
    })
    .catch(error => console.error('Error! ' + error));
}

// Fetch API POST method to post a student
function postStudent(data) {
    const response = fetch(DATA_SOURCE, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(resp => {return resp.json();}).then(data => console.log(data))
    .catch(error => console.error('Error on POST ' + error));
    // automatically update table after post
    const update = fetch(DATA_SOURCE, {method: 'GET'}).then(resp => {
        this.listAll();
    })
}

// get values from input fields
function postStudentButton() {
    let newName = document.getElementById("name").value;
    let newInfo = document.getElementById("info").value;
    let newPoints = document.getElementById("points").value;

    if (newPoints.length == 0)
    {
        // assign empty string as null so it's null in the database
        newPoints = null;
    }

    let newStudent = {
        name: newName,
        info: newInfo,
        exercise_points: newPoints
    };
    postStudent(newStudent);
}

// check inputs, require name, points should be number, post if ok
function checkInput() {
    const inputName = document.getElementById("name");
    const inputPoints = document.getElementById("points");
    if (!inputName.checkValidity()) {
        document.getElementById("checkInput").innerHTML = inputName.validationMessage;
    }
    else if (!inputPoints.checkValidity()) {
        document.getElementById("checkInput").innerHTML = inputPoints.validationMessage;
    }
    else {
        postStudentButton();
    }
}
