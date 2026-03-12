import jwt from 'jsonwebtoken';
import db from '../db.js';

export const getuser =  (req, res) => { 
    res.json({ status: 'Success', name: req.user, userId: req.userId }); 
};

export const getUserprofile =  (req, res) => { 
   
    const userId = req.params.userId;
    // console.log("Fetching profile for userId:", userId);

    const q = "SELECT id,  name, city, profilePic, coverPic FROM users WHERE id = ?";

    db.query(q, [userId], (err, data) => {
        if (err) return res.status(500).json(err);
        res.json({ status: 'Success', resp: data[0] });
    });
}; 

export const updateUser = (req, res) => {  

    console.log("Update User Request Body:", req.body);

    const token = req.cookies.token;
    if (!token) return res.status(401).json("Not authenticated!");

     

    jwt.verify(token, "your_jwt_secret", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        const q = "UPDATE users SET `name`=?, `city`=?, `profilePic`=?, `coverPic`=? WHERE id=?";

        db.query(q, [
            req.body.name, // Agar input field name 'name' hai
            req.body.city,
            req.body.profilePic.filename, // Agar input field name 'profile' hai
            req.body.coverPic.filename, // Agar input field name 'cover' hai
            userInfo.id
        ], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("Profile updated successfully.");
        });
    });
};

export const verifyuser = (req, res, next) => {
    // console.log("Cookies:", req.cookies?.token);

    const token = req.cookies?.token;
    // console.log("Token:", token);

    if (!token) {
        return res.status(200).json({ message: "Token not found" });
    }

    jwt.verify(token, "your_jwt_secret", (err, 
        decoded) => {
        if (err) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        req.user = decoded.name;
        req.userId = decoded.id; 
        next();
    });
};