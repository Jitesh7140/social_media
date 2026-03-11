import jwt from 'jsonwebtoken';

export const getuser =  (req, res) => {



    res.json({ status: 'Success', name: req.user });
};

export const verifyuser = (req, res, next) => {
    // console.log("Cookies:", req.cookies?.token);

    const token = req.cookies?.token;
    // console.log("Token:", token);

    if (!token) {
        return res.status(200).json({ message: "Token not found" });
    }

    jwt.verify(token, "your_jwt_secret", (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        req.user = decoded.name;
        next();
    });
};