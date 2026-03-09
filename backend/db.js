const mySql = require('mysql');

const db = mySql.createConnection({
    host: 'localhost',
    user: 'your_username!',
    password: 'your_password!',
    database: 'jwt_db' 
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
    }
    console.log('Connected to the database');
});

module.exports = db;