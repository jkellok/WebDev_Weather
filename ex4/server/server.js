const express = require('express')
const app = express()
const port = 3000

const router = express.Router()

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// Task 1: path /json
// json object
let weekdays =
{
  "Monday" : 0,
  "Tuesday" : 1,
  "Wednesday" : 2,
  "Thursday" : 3,
  "Friday" : 4,
  "Saturday" : 5,
  "Sunday" : 6
}

app.get('/json', (req, res) => {
  // header, status code, 200 = OK
  //res.writeHead(200, {'Content-Type': 'application/json'}); -> Cannot set headers after they are sent to the client
  res.set('Content-Type', 'application/json'); // maybe works?
  res.send(weekdays)
})

// Task 2
// html table, could use for loop too
let table =
`<h1>Days of the Week</h1>
<table style="background-color:lightblue; border: 1px solid blue; width:50%">
<tr>
  <td>Monday</td>
  <td>0</td>
</tr>
<tr>
  <td>Tuesday</td>
  <td>1</td>
</tr>
<tr>
  <td>Wednesday</td>
  <td>2</td>
</tr>
<tr>
  <td>Thursday</td>
  <td>3</td>
</tr>
<tr>
  <td>Friday</td>
  <td>4</td>
</tr>
<tr>
  <td>Saturday</td>
  <td>5</td>
</tr>
<tr>
  <td>Sunday</td>
  <td>6</td>
</tr>
</table>`

app.get('/html', (req, res) => {
  res.set('Content-Type', 'text/html');
  res.send(internalcss + table)
})

// Task 3: show specific day 0-6

app.get('/html/:id', (req, res, next) => {
  res.set('Content-Type', 'text/html');
  if (req.params.id === '0') {
    res.send(internalcss + `
    <h1>Days of the Week</h1>
    <table style="background-color:lightblue; border: 1px solid blue; width:50%">
    <tr>
      <td>Monday</td>
      <td>0</td>
    </tr>
    </table>`)
  }
  if (req.params.id === '1') {
    res.send(internalcss + `
    <h1>Days of the Week</h1>
    <table style="background-color:lightblue; border: 1px solid blue; width:50%">
    <tr>
      <td>Tuesday</td>
      <td>1</td>
    </tr>
    </table>`)
  }
  if (req.params.id === '2') {
    res.send(internalcss + `
    <h1>Days of the Week</h1>
    <table style="background-color:lightblue; border: 1px solid blue; width:50%">
    <tr>
      <td>Wednesday</td>
      <td>2</td>
    </tr>
    </table>`)
  }
  if (req.params.id === '3') {
    res.send(internalcss + `
    <h1>Days of the Week</h1>
    <table style="background-color:lightblue; border: 1px solid blue; width:50%">
    <tr>
      <td>Thursday</td>
      <td>3</td>
    </tr>
    </table>`)
  }
  if (req.params.id === '4') {
    res.send(internalcss + `
    <h1>Days of the Week</h1>
    <table style="background-color:lightblue; border: 1px solid blue; width:50%">
    <tr>
      <td>Friday</td>
      <td>4</td>
    </tr>
    </table>`)
  }
  if (req.params.id === '5') {
    res.send(internalcss + `
    <h1>Days of the Week</h1>
    <table style="background-color:lightblue; border: 1px solid blue; width:50%">
    <tr>
      <td>Saturday</td>
      <td>5</td>
    </tr>
    </table>`)
  }
  if (req.params.id === '6') {
    res.send(internalcss + `
    <h1>Days of the Week</h1>
    <table style="background-color:lightblue; border: 1px solid blue; width:50%">
    <tr>
      <td>Sunday</td>
      <td>6</td>
    </tr>
    </table>`)
  }
  next()
})



// Task 4 style, not sure how to implement in css so html it shall be
/*
let style = `
  body {
    background-color: darkorange;
  }
  h1 {
    color: white;
    font-family: courier;
  }
  table, td {
    border: 1px solid;
  }
`
*/

let internalcss = `
  <style>
  body {background-color: #576e90;}
  h1 {font-family: courier; color: white;}
  table, td {border: 1px solid; border-collapse: collapse;}
  </style>`

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})