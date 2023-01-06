const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql2');

const cors = require('cors');
app.use(cors());
app.use(bodyParser.json());

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'crud_db',
    port: '3333'
});

conn.connect((err) => {
    if(err) throw err;
    console.log('Mysql Connected...');
});

app.get('/api/users', (req, res) => {
    let sql = "SELECT * FROM user";
    let query = conn.query(sql, (err, results) => {
        if(err) throw err;
        res.send(results)
    });
});

app.get('/api/users/:id', (req, res) => {
    let sql = "SELECT * FROM user WHERE user_id="+req.params.id;
    let query = conn.query(sql, (err, results) => {
        if(err) throw err;
        res.send(results)
    });
});

app.post('/api/users', (req, res) => {
    let data = {
        user_name: req.body.user_name, 
        user_email: req.body.user_email,
        user_address: req.body.user_address,
        user_phone: req.body.user_phone,   
    };
    let sql = "INSERT INTO user SET ?";
    let query = conn.query(sql, data,(err, results) => {
        if(err) throw err;
        res.send(JSON.stringify({"status":200, "error": null, "response": "Insert data success"}))
    });
});

app.put('/api/users/:id', (req, res) => {
    let sql = "UPDATE user SET user_name='"+req.body.user_name+"', user_email='"+req.body.user_email+"', user_address='"+req.body.user_address+"', user_phone='"+req.body.user_phone+"' WHERE user_id="+req.params.id;
    let query = conn.query(sql, (err, results) => {
        if(err) throw err;
        res.send(JSON.stringify({"status":200, "error": null, "response": "Update data success"}))
    });
});

app.delete('/api/users/:id', (req, res) => {
    let sql = "DELETE FROM user WHERE user_id="+req.params.id+"";
    let query = conn.query(sql, (err, results) => {
        if(err) throw err;
        res.send(JSON.stringify({"status":200, "error": null, "response": "Delete data success"}))
    });
});


app.listen(3000, () => {
    console.log('Server started on port 3000...')
})