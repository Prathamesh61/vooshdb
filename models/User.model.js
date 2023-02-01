const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: { type: String, require: true },
    phone_number: { type: Number, require: true },
    password: { type: String, require: true }
}, { timestamps: true })


const userModel = mongoose.model("user", userSchema)

module.exports = {
    userModel,
}