import mongoose from "mongoose";

const GameSchema = new mongoose.Schema({
    game_id: {
        type: String,
        required: [true, "ID is required"]
    },
    title: {
        type: String,
        required: [true, "title is required"]   
    },
    description: {
        type: String,
        required: [true, "Write a short descriptionj"]
    },
    date: {
     type:Date,
    required:[true, "Please enter  date"],
      
    }
})
  
export default mongoose.model("Game", GameSchema); 
  