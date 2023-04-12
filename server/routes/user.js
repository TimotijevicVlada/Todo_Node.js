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

module.exports = router;