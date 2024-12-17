var jwt = require('jsonwebtoken');
const JWT_SECRET = "VirendraRathva";

const fetchuser = (req, res, next) => {

    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ error: "Please login using valid authenticate token" });
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({ error: "Please login using valid authenticate token" });
    }
}

module.exports = fetchuser;