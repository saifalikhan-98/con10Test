import mongoose, { Schema } from "mongoose";
const emailValidator = require('email-validator');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 12;

const UserDetailsSchema=new Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        index: { unique: true },
        minlength: 3,
      },
      email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        index: { unique: true },
        validate: {
          validator: emailValidator.validate,
          message: props => `${props.value} is not a valid email address!`,
        },
      },
      password: {
        type: String,
        required: true,
        trim: true,
        index: { unique: true },
        minlength: 8,
      },
      picture: {
        type: String,
      },
    }, { timestamps: true 
});

UserDetailsSchema.pre('save', async function preSave(next) {
    const user = this;
    if (!user.isModified('password')) return next();
    try {
      const hash = await bcrypt.hash(user.password, SALT_ROUNDS);
      user.password = hash;
      return next();
    } catch (err) {
      return next(err);
    }
  });


  UserDetailsSchema.methods.comparePassword = async function comparePassword(candidate) {
    return bcrypt.compare(candidate, this.password);
  };
  
export const user=mongoose.model('User', UserDetailsSchema)