import User from "../models/User.js";
import bcrypt from "bcryptjs"
import { generateRefreshToken } from "../utils/jwt-tokens.js";

const registerUser = async (req,res) => {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne(email);
    if (existingUser) {
        return res.status(400).json({
            error: true,
            message: "User already exists"
        })
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
        name: name,
        email: email,
        password: hashedPassword
    })

    const token=generateRefreshToken(user._id);

    res.status(201).json({
        _id:user._id,
        name:user.name,
        email:user.email,
        token
    })

}

export { registerUser }