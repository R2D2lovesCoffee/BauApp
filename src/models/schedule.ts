import mongoose, { Schema } from "mongoose";
import { EngineerSchema } from "./engineer";

const ScheduleSchema = new Schema({
    engineers: [EngineerSchema],
    date: { type: Date }
});

export default mongoose.model('schedule', ScheduleSchema);