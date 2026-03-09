const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const db = require('./db');

const app = express();
app.use(express.json());
app.use(cors(
    {
        origin: 'http://localhost:5173', // Frontend URL
        credentials: true // Allow cookies to be sent
    }
));
app.use(cookieParser());

db.query("SELECT 1", (err, result) => {
    if (err) console.log(err);
    else console.log("DB working");
});

const verifyuser = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(200).json({ status: 'Error', message: 'token not found' });
    } else {
        jwt.verify(token, 'your_jwt_secret', (err, decoded) => {
            if (err) {
                return res.status(401).json({ status: 'Error', message: 'Unauthorized' });
            } else {
                req.user = decoded.name; // User info ko request object mein attach karein
                next();
            }
        })
    }
};
app.get('/', verifyuser, (req, res) => {
    res.json({ status: 'Success', name: req.user });
});

app.post('/api/register', async (req, res) => {
    // console.log("Received registration data:", req.body); // Debugging ke liye
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    db.query("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [name, email, hashedPassword], (err, result) => {
        if (err) {
            console.log(err.sqlMessage); // SQL error message ko log karein
            if (err.code === 'ER_DUP_ENTRY') {
                res.status(400).json({ success: false, message: "Email already exists" });
            } else {
                res.status(500).json({ success: false, message: "Registration failed" });
            }
        }
        else {
            res.json({ success: true, message: "Registration successful" });
        }
    });

});

app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    db.query("SELECT * FROM users WHERE email = ?  ", [email], async (err, result) => {
        if (err) {
            console.log(err.sqlMessage);
            res.status(500).json({ success: false, message: "Login failed" });
        }
        else if (result.length === 0) {
            res.status(400).json({ success: false, message: "User not found" });
        }
        else {
            // console.log("User found:", result[0]); // Debugging ke liye
            const user = result[0];
            const isPasswordValid = await bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) {
                    console.log("Error comparing passwords:", err);
                    res.status(500).json({ success: false, message: "Login failed" });
                } else if (!isMatch) {
                    res.status(400).json({ success: false, message: "Invalid credentials" });
                } else {
                    const token = jwt.sign({ id: user.id, name: user.name }, 'your_jwt_secret', { expiresIn: '1d' });
                    res.cookie('token', token, { httpOnly: true });
                    res.json({ success: true, token });
                }
            });

        }


    });
});

app.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.json({ status: 'Success', message: 'Logged out successfully' });
});



app.listen(5000, () => {
    console.log('Server is running on http://localhost:5000');
});