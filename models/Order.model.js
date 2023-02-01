const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        require: true,
    },
    sub_total: { type: Number, require: true },
    phone_number: { type: Number, require: true }
}, { timestamps: true })

const orderModel = mongoose.model("order", orderSchema)

module.exports = {
    orderModel
}