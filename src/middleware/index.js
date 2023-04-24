const User = require("../users/model");

const bcrypt = require("bcrypt");

const saltRounds = process.env.SALT_ROUNDS

const hashPass = async (req, res, next) => {
    try {
        req.body.password = await bcrypt.hash(req.body.password, parseInt(saltRounds));
        next();
    } catch (error) {
        res.status(501).json({errorMessage: error.message, error: error})
    }
};

const comparePass = async (req, res, next) => {
    try {
        //TODO:
        // Find user in our database using the surname passed in req.body
        // req.user = await User ....

        // use .compare() method to compare if the plain text password matches the hashed version stored in the database
    

        // Error handling if password don't match OR username doesn't exist in the database

        // if they do match, continue to the controller 
        req.user = await User.findOne({where: {username: req.body.username}});
        if (req.user === null) {
            throw new Error ("password or username doesn't match")
        }

        const comaprePassword = await bcrypt.compare(req.body.password, req.user.password)

        if(!comaprePassword){
            throw Error("password or username doesn't match")
        }
        next();
    } catch (error) {
        res.status(501).json({errorMessage: error.message, error: error})
    }
}

module.exports = {
    hashPass,
    comparePass
}