import mongoose, { Schema } from "mongoose";

export const EngineerSchema = new Schema({
    name: String,
});

export default mongoose.model('engineer', EngineerSchema);