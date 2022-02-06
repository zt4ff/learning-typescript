/* eslint-disable import/no-extraneous-dependencies */
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const SF = process.env.SALT_FACTOR;
if (!SF) {
  console.log('salt factor do not exist');
  process.exit(1);
}
const SALT_FACTOR: number = Number(SF);

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  // TODO - store QuoteModel in Arrays here - how to link documents in mongoDB
  quotes: [String],
});

// eslint-disable-next-line func-names
UserSchema.pre('save', function (done) {
  const user:any = this;
  if (!user.isModified('password')) return done();

  bcrypt.genSalt(SALT_FACTOR, (err, salt) => {
    if (err) {
      return done(err);
    }
    bcrypt.hash(user.password, salt, (err1, hashedPassword) => {
      if (err1) {
        return done(err1);
      }
      user.password = hashedPassword;
      done();
    });
  });
});

export const User = mongoose.model('User', UserSchema);
