import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class UserController {
    static userRegistration = async (req, res) => {
        const { name, email, password, password_confirmation, tc } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            res.send({ "status": "failed", "message": "Email already exists" })
        } else {
            if (name && email && password && password_confirmation && tc) {
                if (password === password_confirmation) {
                    try {
                        const salt = await bcrypt.genSalt(10);
                        const hashPassword = await bcrypt.hash(password, salt);
                        const newUser = new User({
                            name,
                            email,
                            password: hashPassword,
                            tc
                        })
                        await newUser.save();
                        res.send({ "status": "success", "message": "User saved successfully!!" })

                    } catch (error) {
                        console.log(error);
                        res.send({ "status": "failed", "message": "Unable to register" })

                    }
                } else {
                    res.send({ "status": "failed", "message": "Password and Confirm password doesn't match" })
                }
            } else {
                res.send({ "status": "failed", "message": "All fields are required" });
            }
        }
    }

    static userLogin = async (req, res) => {
        try {
            const { email, password } = req.body;
            if (email && password) {
                const user = await User.findOne({ email });
                if (user != null) {
                    const isMatch = await bcrypt.compare(password, user.password);
                    if (email === user.email && isMatch) {
                        res.send({ "status": "success", "message": "User login success" })
                    } else {
                        res.send({ "status": "failed", "message": "User or password is not valid" })

                    }
                } else {
                    res.send({ "status": "failed", "message": "You are not a registered user" })
                }
            } else {
                res.send({ "status": "failed", "message": "All fields are required!!" })
            }
        } catch (error) {
            console.log(error);
        }
    }
}

export default UserController;