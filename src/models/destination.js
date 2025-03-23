import mongoose, { Schema, Types } from "mongoose";

const destinationSchema = new mongoose.Schema({
_id: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
      },
  country: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  trivia: {
    type: [String],
    default: [],
  },
  fun_fact: {
    type: [String], 
    default: [],
  },
  clues: {
    type: [String], 
    required: true,
  },
}, { timestamps: true });

const Destination = mongoose.models?.Destination || mongoose.model("destinations", destinationSchema);


export default Destination;

