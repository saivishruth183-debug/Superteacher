import User from "../modules/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if(!user) {
            return res.status(404).json({success: false, message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(401).json({success: false, message: "Invalid credentials" });
        }
        
        const token = jwt.sign({ id: user._id, role: user.role }, 
            process.env.JWT_KEY, { expiresIn: "10d" }
        );
        res.status(200).json({success: true, message: "Login successful", token, user: { id: user._id, email: user.email, role: user.role } });
    } catch (error) {
        console.log(error);
    }
}

export {login}