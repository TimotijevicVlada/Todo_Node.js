const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

//GET USER
router.get("/user/get", async (req, res) => {
    try {
        const { id } = req.query;
        const user = await User.findById(id);
        const { password, ...others } = user._doc;
        res.status(200).json(others);
    } catch (error) {
        res.status(500).json(error);
    }
})

//EDIT USER
router.put("/user/update", async (req, res) => {
    try {
        let user = {};
        if (req.body.password) { //If password exist
            const salt = await bcrypt.genSalt(10);
            const hashedPass = await bcrypt.hash(req.body.password, salt);
            user = {
                ...req.body,
                password: hashedPass
            }
        } else {  //Updating only Picture (that mean there is no password, we need to get that password from database)
            const findUser = await User.findById(req.body._id);
            const { password } = findUser._doc;
            user = {
                ...req.body,
                password: password
            }
        }
        const updatedProfile = await User.findByIdAndUpdate(req.body._id, { $set: user }, { new: true });
        const { password, ...others } = updatedProfile._doc;
        res.status(200).json(others);
    } catch (error) {
        res.status(500).json(error);
    }
})

//DELETE USER
router.delete("/user/delete", async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.body.id);
        const { password, ...others } = deletedUser._doc;
        res.status(200).json(others);
    } catch (error) {
        res.status(500).json(error);
    }
})

module.exports = router;