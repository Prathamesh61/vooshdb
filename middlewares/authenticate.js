const jwt = require('jsonwebtoken')
require('dotenv').config()
const authentication = (req, res, next) => {
    const token = req.headers?.authorization?.split(" ")[1];
    if (!token) {
        res.send({ msg: "Login Again" });
    } else {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const { phone_number } = decoded;
        if (decoded) {
            req.body.phone_number = phone_number;
            next();
        } else {
            res.send({ msg: "Please Login Again" });
        }
    }
}

module.exports = {
    authentication
}