import User from '../models/User.js';
import { validationResult } from 'express-validator';

/**
 * Utility function to sanitize the user object before sending it to the client.
 * Strips sensitive fields like passwords and selects only public/safe properties.
 */
const filterUserResponse = (user) => ({
    id: user._id,
    name: user.name,
    email: user.email,
    country: user.country,
    plan: user.plan || "free",
});

/**
 * Handles user registration:
 * 1. Validates incoming request data
 * 2. Checks for existing user accounts by email
 * 3. Creates and persists the new user document
 * 4. Returns a sanitized user object response
 */
const register = async (req, res) => {
    // 1. Check for express-validator middleware errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { name, email, password, country } = req.body;

        // 2. Prevent duplicate user registrations with the same email
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "This email is already in use" });
        }

        // 3. Create and save new user document in MongoDB
        // Note: Password hashing can be done here using bcrypt or via a Mongoose pre-save hook
        const newUser = await User.create({
            name,
            email,
            password,
            country,
        });

        // 4. Send a single success response with filtered user data
        return res.status(201).json({
            status: "success",
            message: "User registered successfully",
            data: filterUserResponse(newUser),
        });

    } 
    catch (error) {
        // 5. Catch any unhandled database or server errors
        console.error("Registration Error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export default {
    register,
};