const express = require('express');
const app = express();
const mysql = require('mysql2');
const cors = require('cors');
const fs = require('fs');

app.use(cors());
app.use(express.json());

const rawdata = fs.readFileSync('config.json');
const regions = JSON.parse(rawdata);

let db;
// If you don't want create your own db, you can try use
// RemoteMysql.com db that i just created, using the login data below.
// If you want to create ur own database, then use .sql dump files(for database OR for table)
// in the databaseDumps folder.
// Check remote database here: https://remotemysql.com/phpmyadmin/index.php?db=eOvCkCke3N
const db_config={
    host:'remotemysql.com', // 'localhost'
    user: 'eOvCkCke3N',     // 'root'
    password:'nAzWOm33yS',  // 'root'
    database:'eOvCkCke3N', //'phonenumbers'
}
function handleDisconnect() {
    db =mysql.createConnection(db_config)
    db.connect(function(err) {
        if(err) {
            console.log('error when connecting to db:', err);
            setTimeout(handleDisconnect, 2000);
        }
    });

    db.on('error', function(err) {
        console.log('db error', err);
        if(err.code === 'PROTOCOL_CONNECTION_LOST') {
            handleDisconnect();
        } else {
            throw err;
        }
    });
}
handleDisconnect();

app.post('/add',(req, res)=>{
    const phoneNumber = req.body.phoneNumber;
    db.query(`INSERT INTO phoneNumbers (phoneNumber) VALUES (?)`,
        [phoneNumber],
        (err, result)=>{
            if (err){
                console.log(err)
            } else {
                res.send('phoneNumber inserted')
            }
        })
})

app.get('/list',(req, res)=>{
    db.query(`SELECT * FROM phoneNumbers`,
        (err, result)=>{
            if (err){
                console.log(err);
            } else {
                res.send(result);
            }
        })
})

app.get('/regions',(req, res)=>{
    res.send(regions);
})

app.delete('/delete',(req, res)=>{
    const id = req.body.id;
    db.query(`DELETE FROM phoneNumbers WHERE phoneNumbers.id = (?)`,
        [id],
        (err, result)=>{
            if (err){
                console.log(err)
            } else {
                res.send("phoneNumber deleted")
            }
        })
})

app.listen(3001,()=>{
    console.log('server working')
})