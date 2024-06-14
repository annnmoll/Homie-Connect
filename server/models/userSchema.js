const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String },
  age: { type: Number },
  gender: { type: String },
  preferences: {
    gender: { type: String },
    ageRange: {
      min: { type: Number },
      max: { type: Number },
    },
    smoker: { type: Boolean },
    pets: { type: Boolean },
  },
  properties: [{ type: Schema.Types.ObjectId, ref: "Property" }],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", userSchema);
