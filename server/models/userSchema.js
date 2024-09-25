const mongoose = require("mongoose");
const bcrypt = require("bcrypt")
const crypto= require("crypto");
const { Schema } = mongoose;

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String , required : true  },
  chats: [{ type: Schema.Types.ObjectId, ref: 'Chat' }],
  role: {
    type: String,
    required: true,
    enum: ["tenant", "flatOwner", "pgOwner"],
  },
  searchingCity : {type : String , required : true } ,
  age: { type: Number },
  gender: { type: String },
  number : {type : String } ,
  profilePicture : {type: String} , 
  preferences: {
    gender: { type: String },
    ageRange: {
      min: { type: Number },
      max: { type: Number },
    },
    nonSmoker: { type: Boolean, default: false },
    nightOwl: { type: Boolean, default: false },
    earlyBird: { type: Boolean, default: false },
    vegan: { type: Boolean, default: false },
    nonAlcoholic: { type: Boolean, default: false },
    fitnessFreak: { type: Boolean, default: false },
    petLover: { type: Boolean, default: false },
    sporty: { type: Boolean, default: false },
  },
  properties: [{ type: Schema.Types.ObjectId, ref: "Property" }],
  passwordResetToken: String,
  passwordResetExpires: Date,
  createdAt: { type: Date, default: Date.now },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});


userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');
  this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000; // Token valid for 10 minutes
  return resetToken;
};

module.exports = mongoose.model('User', userSchema);

