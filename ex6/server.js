// npm init
// npm install express
// npm install dotenv

const express = require('express')
const app = express()
const port = 3000

const router = express.Router()

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})

// npm install mysql

require('dotenv').config();
const mysql = require('mysql');
const connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected MYSQL!');
})

// for each row show name and info, alphabetic order
// SELECT name, info FROM owned_object;
// sort in alphabetic, if name same, sort by info
app.get('/items', (req, res) => {
  res.set('Content-Type', 'application/json');
  connection.query('SELECT name, info FROM owned_object ORDER BY name, info', (err, rows) =>{
    if (err) throw err

    let items = JSON.stringify(rows)
    console.log(items);
    res.send(items);
  })
})

// for each row show owner/person name and item name and info
// SELECT FROM acquisitions, INNER JOIN to join other tables, DESC order to get latest
// `` for better readability
app.get('/acquisitions', (req, res) => {
  res.set('Content-Type', 'application/json');
  connection.query(`
  SELECT person.name AS owner_name, owned_object.name, owned_object.info
  FROM acquisition
  INNER JOIN person ON acquisition.owner=person.id
  INNER JOIN owned_object ON acquisition.item=owned_object.id
  ORDER BY acquisition_datetime DESC`, (err, rows) =>{
    if (err) throw err

    let acquisitions = JSON.stringify(rows)
    console.log(acquisitions);
    res.send(acquisitions);
  })
})

// show latest 4 -> LIMIT 4 (ORDER BY datetime)
app.get('/latest4', (req, res) => {
  res.set('Content-Type', 'application/json');
  connection.query(`
  SELECT person.name AS owner_name, owned_object.name, owned_object.info
  FROM acquisition
  INNER JOIN person ON acquisition.owner=person.id
  INNER JOIN owned_object ON acquisition.item=owned_object.id
  ORDER BY acquisition_datetime DESC
  LIMIT 4`, (err, rows) =>{
    if (err) throw err

    let latest4 = JSON.stringify(rows)
    console.log(latest4);
    res.send(latest4);
  })
})
