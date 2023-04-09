const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

//REGISTER
router.post("/register", async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);   //we need to hide passoword in database to prevent any possible bad intentions
        const hashedPass = await bcrypt.hash(req.body.password, salt);

        const newUser = new User({
            ...req.body,
            password: hashedPass
        });

        const user = await newUser.save();
        res.status(200).json(user);
    } catch (error) {
        let errorMessage = "";
        if (error.keyValue.email) {
            errorMessage = "This email already exist"
        } else if (error.keyValue.username) {
            errorMessage = "This username already exist"
        } else {
            errorMessage = error
        }
        res.status(500).json(errorMessage);
    }
})

//LOGIN
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });  //first we need to find if that username exist in database
        if (!user) {
            res.status(400).json("Wrong credentials");
        }
        const validated = await bcrypt.compare(req.body.password, user.password);
        if (!validated) {
            res.status(400).json("Wrong password");
        }
        const { password, ...others } = user._doc; //we don't want to send password to the frontend (destructuring)
        res.status(200).json(others);
    } catch (error) {
        res.status(500).json(error);
    }
})


module.exports = router;