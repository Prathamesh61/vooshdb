let express = require("express");
const { user_controller } = require("../controllers/User.controller");
let user_route = express.Router();

user_route.post("/add-user", user_controller.signup);
user_route.post("/login-user", user_controller.login);

module.exports = { user_route };
