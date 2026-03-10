import jwt from 'jsonwebtoken';

export const getuser =  (req, res) => {
    res.json({ status: 'Success', name: "Jitesh" });
};

export const verifyuser = (req, res, next) => {
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