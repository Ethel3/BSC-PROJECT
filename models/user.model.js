import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please enter username"],
        unique: true,
    },
    age: {
        type: Number,
        default: 0,
      },
    email: {
        type: String,
        required: [true, "Please enter your email"],
        unique: true,
    },
    user_id:{
        type: Number,
        ref: "User",
        required: [true, "user_id is required"],
        unique: true
      },
})

export default mongoose.model("User", UserSchema);