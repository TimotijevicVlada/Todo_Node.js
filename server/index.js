const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const todosRoute = require("./routes/todos");
const multer = require("multer");
const cors = require('cors');

dotenv.config();
app.use(express.json());
app.use(cors());   //I use this because of the CORS policy to enable http request work

//mongoose
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(console.log("Connected to MongoDB"))
    .catch((err) => console.log(err))

//Uploading image
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images")
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name)
    }
})
const upload = multer({ storage: storage });
app.post("/server/upload", upload.single("file"), (req, res) => {
    res.status(200).json("File has been uploaded");
});

//Routes to use
app.use("/server", todosRoute)

//If the process.env.PORT variable is not defined (for example, if you're running the server locally), it will default to port 5000.
app.listen(process.env.PORT || 5000, () => {
    console.log(`Backend is running on port ${process.env.PORT || 5000}`)
})