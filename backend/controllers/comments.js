import db from "../db.js"; // Aapka database connection file
import moment from "moment"; // Date formatting ke liye
import jwt from "jsonwebtoken"; // JWT token verification ke liye

export const getcomments = (req, res) => {
    // 1. req.query se postId nikaalein
    const postId = req.query.postId;

    // 2. SQL Query: Comments nikaalo aur Users table se name aur profilePic join karo
    const q = `
        SELECT c.*, u.id AS userId, u.name, u.profilePic 
        FROM comments AS c 
        JOIN users AS u ON (u.id = c.user_id) 
        WHERE c.post_id = ? 
        ORDER BY c.id DESC
    `;

    // 3. Database execute karein
    db.query(q, [postId], (err, data) => {
        if (err) return res.status(500).json(err);
        console.log("Fetched comments data:", data); // Debugging line to check fetched comments 

        // Data ko frontend format mein bhejein
        return res.status(200).json(data);
    });
};


export const addComment = (req, res) => {
    console.log("Received comment data:", req.body); // Debugging line to check incoming comment data

    const token = req.cookies.token;
    if (!token) return res.status(401).json("Not authenticated!");

    // Token verify karne ka logic yahan hona chahiye (JWT verification)
    jwt.verify(token, "your_jwt_secret", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");
        req.body.userId = userInfo.id;
        const q = "INSERT INTO comments (`comment_text`, `createdAt`, `user_id`, `post_id`) VALUES (?)";

        const values = [
            req.body.comment_text,
            moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            req.body.userId, // Yeh aapke auth middleware se aana chahiye
            req.body.post_id
        ];

        console.log("Values to be inserted:", values); // Debugging line to check values before insertion

        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("Comment has been created.");
        });
    });
};