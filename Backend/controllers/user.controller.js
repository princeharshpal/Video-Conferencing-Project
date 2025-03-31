import httpStatus from "http-status";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { userModel } from "../models/user.model.js";

const register = async (req, res) => {
  try {
    const { name, username, password, email } = req.body;

    if (!email || !password || !username || !name) {
      return res
        .status(httpStatus.NOT_ACCEPTABLE)
        .json({ message: "Please provide all fields" });
    }

    const existingUser = await userModel.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      return res
        .status(httpStatus.FOUND)
        .json({ message: "User with this email or username already exixts!" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({
      name,
      username,
      email,
      password: hashPassword,
    });

    return res
      .status(httpStatus.CREATED)
      .json({ message: "User created successfully" });
  } catch (error) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: `Something went wrong ! ${error}` });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(httpStatus.NOT_ACCEPTABLE)
        .json({ message: "Please provide all fields" });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res
        .status(httpStatus.NOT_ACCEPTABLE)
        .json({ message: "Invalid email or password!" });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res
        .status(httpStatus.NOT_ACCEPTABLE)
        .json({ message: "Invalid email or password!" });
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    user.token = token;

    await user.save();

    return res.status(httpStatus.OK).json({ token: token });
  } catch (error) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: `Something went wrong ! ${error}` });
  }
};

export { login, register };
