const { orderModel } = require("../models/Order.model");
const { userModel } = require("../models/User.model");

let order_controller = {
    getOrders: async (req, res) => {
        try {
            let { user_id } = req.query;
            if (user_id) {
                let order = await orderModel.find({ user_id });
                res.send({ "order": order });
            } else {
                let order = await orderModel.find();
                res.send({ "order": order });
            }
        } catch {
            res.send({ "msg": "can't send data right now " });
        }
    },
    postOrder: async (req, res) => {
        try {
            let data = req.body;
            let { phone_number } = req.body;
            const user = await userModel.findOne({ phone_number });
            let new_order = new orderModel({
                user_id: user._id,
                ...data
            });
            await new_order.save();
            res.send({ status: 200, msg: "Order Added", new_order: new_order })
        } catch (err) {
            res.send({ status: 500, msg: "somthing went wrong" })
        }
    }
}

module.exports = { order_controller };