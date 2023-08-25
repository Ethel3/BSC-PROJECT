import mongoose from "mongoose";

const UsergameSchema = new mongoose.Schema({
    user_id:{
        type: Number,
        ref: "User",
        required: [true, "user_id is required"],
        unique: true
      },
      game_id: {
            type: Number,
            ref: "Game",
            required: [true, "game_id is required"],
            unique: true
          },
          user_game_id:{
            type: Number,
            ref: "Usergame",
            required: [true, "user_game_id is required"],
            unique: true
          },
          play_time:{
            type: Number,
            ref: "Hours",
            required: [true, "play_time is required"],
            unique: true
          },
})

