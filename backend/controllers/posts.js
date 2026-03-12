import db from '../db.js';
import jwt from 'jsonwebtoken';
import moment from 'moment';

export const getposts = async (req, res) => { 
  const token = req.cookies.token;
  if (!token) return res.status(401).json("Not authenticated bhai!"); 

  jwt.verify(token, "your_jwt_secret", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    req.userInfo = userInfo;

    // if a specific userId is requested, ignore feed logic and return that user's posts
    if (req.query.userId) {
      const query = "SELECT p.*, u.name FROM post p JOIN users u ON p.user_id = u.id WHERE p.user_id = ? ORDER BY p.createdAt DESC;";
      db.query(query, [req.query.userId], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
      });
      return;
    }

    const query = "SELECT p.*, u.name FROM post p JOIN users u ON p.user_id = u.id    ORDER BY p.createdAt DESC; ";

    db.query(query, ' ', (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    });
  });








}

export const addposts = async (req, res) => {
  console.log("Add Post Request Received:", req.body);
  const token = req.cookies.token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "your_jwt_secret", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const { desc, img   } = req.body;
    const query = "INSERT INTO post(`post_dec`, `img`, `createdAt`, `user_id`) VALUES (?)";

    const values = [desc, img, moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'), userInfo.id];

    db.query(query, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Post has been created.");
    }
    );
  }); 
}
