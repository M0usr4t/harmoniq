const jwt = require('jsonwebtoken')
const { JWT_SECRET } = process.env

module.exports = (req,res,next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({message: 'Access denied. No token provided'})
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET)
        req.accessToken = decoded.accessToken;
        req.spotifyUserId = decoded.spotifyUserId;
        next();
    } catch (err) {
        res.status(400).json({ message: 'Invalid token.' });
    }
}