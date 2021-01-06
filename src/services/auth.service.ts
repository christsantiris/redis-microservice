import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Response } from 'express';
import { user as User } from '../common/schemas/user.schema';

export class AuthService {
  public async signUp(
    { email, password }: { email: string; password: any },
    res: Response
  ) {
    const user = await User.find({ email: email });

    if (user && user.length >= 1) {
      return res.status(409).json({
        message: 'Email exists',
      });
    } else {
      bcrypt.hash(password, 10, async (err, hash) => {
        if (err) {
          return res.status(500).json({
            error: err,
          });
        } else {
          const user = new User({
            _id: new mongoose.Types.ObjectId(),
            email: email,
            password: hash,
          });
          const result = await user.save();
          if (result) {
            res.status(201).json({
              message: `New user created for email ${email}`,
            });
          } else {
            res.status(500).json({
              message: `Error creating user for email ${email}`,
            });
          }
        }
      });
    }
  }

  public async logIn(
    { email, password }: { email: string; password: any },
    res: Response
  ) {
    const user = await User.findOne({ email: email });

    if (user && user.length < 1) {
      return res.status(401).json({
        message: 'User verification failed',
      });
    }
    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        return res.status(401).json({
          message: 'Login failed',
        });
      }
      if (result) {
        const token = jwt.sign(
          {
            email: user.email,
            userId: user._id,
          },
          process.env.JWT_KEY,
          {
            expiresIn: '1h',
          }
        );
        return res.status(200).json({
          message: `Successfully logged in with user: ${email}`,
          token: token,
        });
      }
      res.status(401).json({
        message: 'Auth failed',
      });
    });
  }

  public async deleteUser({ userId }, res) {
    const deletedUser = await User.deleteOne({ _id: userId });
    console.log(deletedUser);
    if (deletedUser && deletedUser.deletedCount > 0) {
      res.status(200).json({
        success: true,
        message: `User with ID ${userId} deleted`,
      });
    } else {
      res.status(404).json({
        success: false,
        message: `Error deleting user with ID ${userId}`,
      });
    }
  }
}
