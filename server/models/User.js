import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: 6,
        select: false, // hidden from default queries
        trim: true,
    },
    country: {
        type: String,
        required: [true, "Country is required"],
    },
    courrency: {
        type: String,
        default: "INR",
        uppercase: true,
    },
    plan: {
        type: String,
        enum: ["free", "pro", "enterprise"],
        default: "free",
    },
},
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    },
)

const User = mongoose.model("User", userSchema);
export default User;