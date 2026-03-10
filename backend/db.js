const mySql = require('mysql');

const db = mySql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root', 
    database: 'social_media' 
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
    }
    console.log('Connected to the database');
});

db.query("SELECT 1", (err, result) => {
    if (err) console.log(err);
    else console.log("DB working");
});

module.exports = db;