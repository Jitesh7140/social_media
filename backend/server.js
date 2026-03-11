const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const path = require('path');

// modules other than Inbuild modules
const db = require('./db');
const userRoutes = require('./routes/users'); 
const authRoutes = require('./routes/auth'); 
const postsRoutes = require('./routes/posts'); 
const commentsRoutes = require('./routes/comments'); 
const likesRoutes = require('./routes/likes'); 


const app = express(); 
app.use(express.json());
app.use(cors(
    {
        origin: 'http://localhost:5173', // Frontend URL
        credentials: true // Allow cookies to be sent
    }
));
app.use(cookieParser());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../frontend/public/uploads/')
  },
  filename: function (req, file, cb) {
     
    cb(null, Date.now() +  file.originalname ) // Appending extension
  }
})

const upload = multer({ storage: storage })

app.post('/api/upload', upload.single('file'), (req, res) => {
  const file = req.file;
    if (!file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }
    res.status(200).json({ message: 'File uploaded successfully', filename: file.filename });
}); 

app.use('/api/user',userRoutes);
app.use('/api/auth',authRoutes);  
app.use('/api/posts',postsRoutes);
app.use('/api/comments',commentsRoutes);
app.use('/api/likes',likesRoutes);

  
app.listen(5000, () => {
    console.log('Server is running on http://localhost:5000');
});