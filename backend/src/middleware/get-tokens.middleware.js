const getTokens = require('../services/get-tokens.service')

module.exports = async (req,res,next) => {
    const {code} = req.query

    try {
        const {accessToken, JWToken} = await getTokens(code);
        req.userInfo = {accessToken, JWToken}
        next();
    } catch (err){
        console.error('Error getting tokens from Spotify (middleware): ', {
            message: err.message,
            stack: err.stack,
            responseStatus: err.response?.status,
            responseData: err.response?.data,
        })
        res.status(500).send('Internal Server Error')
    }
}