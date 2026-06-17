import mongoose from "mongoose";

const ONE_HOUR_MS = 60 * 60 * 1000;

const textShareSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      index: true,
      uppercase: true,
      trim: true
    },
    text: {
      type: String,
      required: true,
      trim: true,
      maxlength: 12000
    },
    expiresAt: {
      type: Date,
      required: true,
      default: () => new Date(Date.now() + ONE_HOUR_MS),
      index: { expires: 0 }
    }
  },
  { timestamps: true }
);

export default mongoose.model("TextShare", textShareSchema);
