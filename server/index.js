const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const todosRoute = require("./routes/todos");
const cors = require('cors');

dotenv.config();
app.use(express.json());
app.use(cors());   //I use this because of the CORS policy to enable http request work

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(console.log("Connected to MongoDB"))
    .catch((err) => console.log(err))

app.use("/server", todosRoute)

app.listen(process.env.PORT || 5000, () => {
    console.log("Backend is running")
})