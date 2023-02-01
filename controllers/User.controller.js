const { userModel } = require("../models/User.model");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config()

let user_controller = {
    signup: async (req, res) => {
        // console.log(req.body);
        try {
            const { name, phone_number, password } = req.body;
            if (name && phone_number && password) {
                let user = await userModel.findOne({ phone_number });
                if (user) {
                    res.send({
                        msg: "User Already Registered",
                        status: 404,
                    });
                } else {
                    bcrypt.hash(password, 4, async (err, result) => {
                        if (err) {
                            res.send({
                                msg: "somthing went wrong",
                                status: 500,
                            });
                        } else {
                            let user = {
                                name,
                                phone_number,
                                password: result,
                            };
                            const new_user = new userModel(user);
                            await new_user.save();
                            res.send({
                                msg: "Registered Successfully",
                                status: 200,
                            });
                        }
                    });
                }
            } else {
                res.send({ msg: "Please fill All Details" });
            }
        } catch (err) {
            res.send({ status: 500, msg: "User Register Failed" });
        }
    },
    login: async (req, res) => {
        let { phone_number, password } = req.body;
        let user = await userModel.findOne({ phone_number });
        if (user) {
            bcrypt.compare(password, user.password, (err, result) => {
                if (result) {
                    const token = jwt.sign({ phone_number }, process.env.JWT_SECRET);
                    res.send({ status: 200, "token": token, "user": user });
                } else {
                    res.send({ status: 500, msg: "Wrong Credentials" });
                }
            });
        } else {
            res.send({ status: 500, msg: "Wrong Credentials" });
        }
    },
}

module.exports = { user_controller };