const jwt = require('jsonwebtoken');
 
module.exports = async (req, res, next) => {
    if(!req.headers.authorization) return res.sendStatus(401).json('Not Authenticated.');
    
    try {
        const token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, 'mystrongsecretkey',
            (err,decoded) => {
                if (err) return res.status(403).json('Token Is Not Valid.');
                req.userId = decoded.userId;
                req.userRole = decoded.userRole;
                next();
            });
    } catch (err) {
        next(err);
    }
}