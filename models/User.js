const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const UserSchema = new mongoose.Schema({
  fullName: { 
    type: String, 
    required: true 
  },
  userName: { 
    type: String, 
    unique: true, 
    required: true
  },
  email: { 
    type: String, 
    unique: true, 
    required: true
  },
  avatar: {
    type: String,
    required: false
  },
  password:{ 
    type: String, 
    required: true 
  },
  communities:{ 
    type: Array, 
    required: false 
  },
  bio:{ 
    type: String, 
    required: false 
  },
  location:{ 
    type: String, 
    required: false 
  },
  website:{ 
    type: String, 
    required: false 
  },
  DOB:{ 
    type: Date, 
    required: false
  },
  resetPasswordToken: {
    type: String,
    required: false
},

resetPasswordExpires: {
    type: Date,
    required: false
},
}, {timestamps: true});

// Password hash middleware.

UserSchema.pre("save", function save(next) {
  const user = this;
  if (!user.isModified("password")) {
    return next();
  }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
});

// Helper method for validating user's password.

UserSchema.methods.comparePassword = function comparePassword(
  candidatePassword,
  cb
) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    cb(err, isMatch);
  });
};

UserSchema.methods.generateJWT = function() {
  const today = new Date();
  const expirationDate = new Date(today);
  expirationDate.setDate(today.getDate() + 60);

  let payload = {
      id: this._id,
      email: this.email,
      username: this.userName,
      fullName: this.fullName,
      
  };

  return jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: parseInt(expirationDate.getTime() / 1000, 10)
  });
};

UserSchema.methods.generatePasswordReset = function() {
  this.resetPasswordToken = crypto.randomBytes(20).toString('hex');
  this.resetPasswordExpires = Date.now() + 3600000; //expires in an hour
};

mongoose.set('useFindAndModify', false);

module.exports = mongoose.model("User", UserSchema);
