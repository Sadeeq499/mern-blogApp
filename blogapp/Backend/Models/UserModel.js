import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const UserSchema = new Schema(
  {
    avatar: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      min: 6,
      required: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    verificationCode: {
      type: String,
      required: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },

  {
    timestamps: true,
  }
);

// hash password before saving to database
UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hashSync(this.password, 10);
    return next();
  }
  next();
});

// generate token
UserSchema.methods.generateToken = async function () {
  const token = jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  return token;
};

// compare password
UserSchema.methods.comparePassword = async function (password) {
  return bcrypt.compareSync(password, this.password);
};

const User = model("User", UserSchema);

export default User;
