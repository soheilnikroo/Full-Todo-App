//third-party packages and libs
const jwt = require('jsonwebtoken');

//User model
const User = require('../models/User');

const authenticate = async (req, res, next) => {
    try{
        const token = req.header('Authorization').replace('Bearer ', '');
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findOne({_id: decodedToken._id, 'tokens.token': token}); 

        if(!user){
            throw new Error('')
        };

        req.user = user;
        req.token = token;
        next();
    }catch(error){
        res.status(401).json({
            error: 'Please authenticate first!'
        });
    };
};

//exporting section 
module.exports = authenticate;