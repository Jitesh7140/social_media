const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cors = require('cors');
const cookieParser = require('cookie-parser');

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
 

app.use('/api/user',userRoutes);
app.use('/api/auth',authRoutes);

app.use('/api/auth/logout',(req, res) => {
    res.clearCookie('token');
    res.json({ status: 'Success', message: 'Logged out successfully' });
});

app.use('/api/posts',postsRoutes);
app.use('/api/comments',commentsRoutes);
app.use('/api/likes',likesRoutes);

  
app.listen(5000, () => {
    console.log('Server is running on http://localhost:5000');
});