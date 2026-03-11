import bcrypt from 'bcrypt';
import db from '../db.js'; 
import jwt from 'jsonwebtoken';

export const postlogin =   (req, res) => {
    const { email, password } = req.body;
    // console.log("Received login data:", req.body); // Debugging ke liye
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
};


export const postregister = async (req, res) => {
     
    console.log("Received registration data:", req.body); // Debugging ke liye
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

}
 


export const postlogout = (req, res) => {
    res.clearCookie('token');
    res.json({ status: 'Success', message: 'Logged out successfully' });
};
