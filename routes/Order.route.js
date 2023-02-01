let express = require("express");
const { order_controller } = require("../controllers/Order.controller");
let order_route = express.Router();

order_route.get("/get-order", order_controller.getOrders);
order_route.post("/add-order", order_controller.postOrder);

module.exports = { order_route };
