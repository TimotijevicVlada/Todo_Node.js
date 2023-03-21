const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    }
},
    { timestamps: true }   //automatically gives you "created_at" and "updated_at" props
)

module.exports = mongoose.model("Todo", TodoSchema);