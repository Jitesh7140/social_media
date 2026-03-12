import db from '../db.js';

export const getrelationship = async (req, res) => {
    // console.log('', req.query); // Debugging line to check incoming query parameters
   const q = "SELECT followerUser_id FROM followers WHERE followedUser_id = ?";

   db.query(q, [req.query.followedUserId], (err, data) => {
       if (err) return res.status(500).json(err);
       const followerIds = data.map(row => row.followerUser_id);
    //    console.log("Fetched follower IDs:", followerIds); // Debugging line to check fetched follower IDs
       res.status(200).json(followerIds);
   });


}   


export const addrelationship = async (req, res) => {
    res.status(200).json("Relationship added successfully.");
}   


export const deleterelationship = async (req, res) => {
    res.status(200).json("Relationship deleted successfully.");
}   


