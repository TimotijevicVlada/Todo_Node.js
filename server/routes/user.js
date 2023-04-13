const router = require("express").Router();
const User = require("../models/User");

//GET USER
router.get("/user/get", async (req, res) => {
    try {
        const { id } = req.query;
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json(error);
    }
})

//EDIT USER
router.put("/user/update", async (req, res) => {
    try {
        const updatedProfile = await User.findByIdAndUpdate(req.body._id, { $set: req.body }, { new: true });
        res.status(200).json(updatedProfile);
    } catch (error) {
        res.status(500).json(error);
    }
})

module.exports = router;