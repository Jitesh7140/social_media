import db from '../db.js'
import jwt from "jsonwebtoken";

// 1. Get Likes Logic
export const getlikes = (req, res) => {
    const q = "SELECT user_id FROM likes WHERE post_id = ?";

    db.query(q, [req.query.postId], (err, data) => {
        if (err) return res.status(500).json(err);

        // Sirf IDs ki array: [1, 2, 3]
        const likesList = data.map(like => like.user_id);

        // Current User ki info nikalna (Optional but helpful)
        const token = req.cookies.token;
        if (!token) {
            return res.status(200).json({ likes: likesList, currentUser: null });
        }

        jwt.verify(token, "your_jwt_secret", (err, userInfo) => {
            if (err) return res.status(200).json({ likes: likesList, currentUser: null });
            
            return res.status(200).json({ 
                likes: likesList, 
                currentUserId: userInfo.id 
            });
        });
    });
}

// 2. Toggle Like Logic (Cleaned up)
export const toggleLike = (req, res) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).json("Not authenticated!");

    jwt.verify(token, "your_jwt_secret", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        const userId = userInfo.id;
        const postId = req.body.postId;

        // Check if like already exists
        const checkQuery = "SELECT * FROM likes WHERE user_id = ? AND post_id = ?";

        db.query(checkQuery, [userId, postId], (err, data) => {
            if (err) return res.status(500).json(err);

            if (data.length > 0) {
                // UNLIKE: Agar exist karta hai toh delete karo
                const deleteQuery = "DELETE FROM likes WHERE user_id = ? AND post_id = ?";
                db.query(deleteQuery, [userId, postId], (err, result) => {
                    if (err) return res.status(500).json(err);
                    return res.status(200).json("Post unliked.");
                });
            } else {
                // LIKE: Agar exist nahi karta toh insert karo
                const insertQuery = "INSERT INTO likes (`user_id`, `post_id`) VALUES (?, ?)";
                db.query(insertQuery, [userId, postId], (err, result) => {
                    if (err) return res.status(500).json(err);
                    return res.status(200).json("Post liked.");
                });
            }
        });
    });
};