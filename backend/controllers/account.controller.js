import mongoose from "mongoose";
import { User } from "../models/user.model.js";
import { Account } from "../models/account.model.js";
import { toAccountSchema } from "../zod/account.types.js";

export const fetchBalance = async (req, res) => {
  try {
    const userId = req.userId;
    const account = await Account.findOne({ userId });

    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }

    return res.status(200).json({ balance: account.balance });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong", error: error });
  }
};

export const transferAmount = async (req, res) => {
  try {
    const session = await mongoose.startSession();
    session.startTransaction();

    const { to, amount } = req.body;

    const { success } = toAccountSchema.safeParse(req.body);

    if (!success) {
      return res.status(400).json({ message: "Invalid request" });
    }

    const account = await Account.findOne({ userId: req.userId }).session(
      session
    );

    if (!account || amount > account.balance) {
      await session.abortTransaction();
      return res.status(400).json({ message: "Insufficient balance" });
    }

    const toAccount = await Account.findOne({ userId: to }).session(session);

    if (!toAccount) {
      await session.abortTransaction();
      return res.status(404).json({ message: "Receiver account not found" });
    }

    await Account.updateOne(
      { userId: req.userId },
      { $inc: { balance: -amount } }
    ).session(session);

    await Account.updateOne(
      { userId: to },
      { $inc: { balance: amount } }
    ).session(session);

    await session.commitTransaction();

    return res
      .status(200)
      .json({ message: "Transaction successfull", success: true });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong", success: false });
  }
};
