var mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const crypto = require("crypto");

var userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 32,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    encry_password: {
      type: String,
      required: true
    },
    userinfo: {
      type: String,
      trim: true
    },
    salt: String,
    role: {
      type: Number,
      default: 0
    },
    activated: {
      type: Number,
      default: 0
    },
    blogs: {
      type: Array,
      default: []
    }
  },
  { timestamps: true }
);

userSchema
  .virtual("password")
  .set(function (password) {
    this._password = password;
    this.salt = uuidv4();
    this.encry_password = this.securePassword(password);
  })
  .get(function () {
    return this._password;
  });

userSchema.methods = {
  securePassword: function (plainpassword) {
    if (!plainpassword) {
      return "";
    }
    try {
      return crypto
        .createHmac("sha256", this.salt)
        .update(plainpassword)
        .digest("hex");
    } catch (err) {
      return "";
    }
  },
  authenticate: function (password) {
    return this.securePassword(password) === this.encry_password;
  }
};

module.exports = mongoose.model("User", userSchema);
