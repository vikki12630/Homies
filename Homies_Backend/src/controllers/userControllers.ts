import { Request, Response } from "express";
import { statusCodes } from "../utils/statusCodes";
import { asyncHandler } from "../utils/asyncHandler";
import { IUser, User } from "../models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// signup user
const signUp = asyncHandler(async (request: Request, response: Response) => {
  const { name, userName, email, password } = request.body;

  if (!name || !userName || !email || !password) {
    return response.status(statusCodes.ALL_FEILDS_REQURED).json({
      message: "all parameters are required",
      parameters: "name, userName, email, password",
    });
  }

  const existingUser = await User.findOne({
    $or: [{ email }, { userName }],
  });

  if (existingUser) {
    return response.status(statusCodes.USER_ALREADY_EXIST).json({
      message: "user alreday exist with this email or username",
    });
  }

  // encrypt password
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    userName,
    email,
    password: hashedPassword,
  });
  // user = await user.save();

  const userData = await User.findById(user._id).select("-password");

  if (!userData) {
    return response.status(statusCodes.DB_ERRORS).json({
      message: "unable to create user db_errors",
    });
  }

  const accessToken: string = jwt.sign(
    `${userData._id}`,
    `${process.env.ACCESS_TOKEN_SECRET}`
  );
  const refreshToken: string = jwt.sign(
    `${userData._id}`,
    `${process.env.REFRESH_TOKEN_SECRET}`
  );

  const options = {
    httpOnly: true,
    secure: true,
    sameSite: false,
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  };

  response
    .status(statusCodes.USER_CREATED)
    .cookie("refreshToken", refreshToken, options)
    .json({
      message: "user created successfully",
      userData,
      accessToken,
    });
});

export { signUp };
