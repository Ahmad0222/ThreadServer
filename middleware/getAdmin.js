var jwt = require('jsonwebtoken');
const JWT_Secret = "secret";
const User = require('../models/User');

const getAdmin = async (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({
        msg: 'No token, authorization denied'
    });
    try {
        const decoded = jwt.decode(token, JWT_Secret);
        req.user = decoded;
        User.findOne(req.user.id).then((user) => {
            if (!user.isAdmin) {
                return res.status(401).json({
                    msg: 'Authorization denied!'
                });
            }
            next();
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = getAdmin;