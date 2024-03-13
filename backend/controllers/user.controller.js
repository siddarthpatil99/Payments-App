import { User } from "../models/user.model.js";
import { updateSchema, userSchema } from "../zod/user.types.js";
import { Account } from "../models/account.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userInput = userSchema.safeParse(req.body);

    if (!userInput.success) {
      return res.status(400).json({ message: "Invalid inputs" });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const userId = newUser._id;
    console.log(userId);

    await Account.create({
      userId,
      balance: 1 + (Math.random() * 10000).toFixed(2),
    });

    const token = await jwt.sign(
      { userId: newUser._id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRY }
    );

    return res
      .status(200)
      .json({ message: "User registered", token: token, success: true });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Something went wrong", error: error, success: false });
  }
};

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    const userPwd = existingUser.password;
    const isPasswordCorrect = await bcrypt.compare(password, userPwd);

    if (!isPasswordCorrect) {
      return res
        .status(403)
        .json({ message: "Incorrect password", success: false });
    }

    const token = await jwt.sign(
      { userId: existingUser._id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRY }
    );

    res.cookie(process.env.COOKIE_NAME, token, {
      maxAge: 1 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "strict",
    });

    return res
      .status(200)
      .json({ message: "Login success", token: token, success: true });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong", error: error });
  }
};

export const updateInfo = async (req, res) => {
  const { success } = updateSchema.safeParse(req.body);
  const { email, name, oldPassword, newPassword } = req.body;

  if (!success) {
    return res
      .status(400)
      .json({ message: "Error while updating information" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    if (name) {
        user.name = name;
    }

    const isPasswordCorrect = await bcrypt.compare(oldPassword, user.password);

    if (!isPasswordCorrect) {
      return res
        .status(403)
        .json({ message: "Old password is incorrect", success: false });
    }

    const hashNewPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashNewPassword;
    await user.save();

    return res
      .status(200)
      .json({ message: "Info updated successfully", success: true });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong", error: error });
  }
};

export const currentUser = async (req, res) => {
  const userId = req.userId;

  try {
    const user = await User.findOne({ _id: userId });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const currentUser = {
      email: user.email,
      name: user.name,
      password: user.password,
    };

    return res.status(200).json({ currentUser });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong", error: error });
  }
};
