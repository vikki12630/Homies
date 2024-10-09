import { Request, Response } from "express";
import { statusCodes } from "../utils/statusCodes";
import { asyncHandler } from "../utils/asyncHandler";
import { IUser, User } from "../models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

/*
@signup user
@Post request
@params = name, userName, email, password
*/
const signUp = asyncHandler(async (request: Request, response: Response) => {
  const { name, userName, email, password } = request.body;

  if (!name || !userName || !email || !password) {
    return response.status(statusCodes.ALL_FEILDS_REQURED).json({
      message: "All parameters are required",
      parameters: "name, userName, email, password",
    });
  }

  const existingUser = await User.findOne({
    $or: [{ email }, { userName }],
  });

  if (existingUser) {
    return response.status(statusCodes.USER_ALREADY_EXIST).json({
      message: "User alreday exist with this email or username",
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
      message: "Unable to create user db_errors",
    });
  }

  // creating access token
  const accessToken: string = jwt.sign(
    { id: userData._id },
    `${process.env.ACCESS_TOKEN_SECRET}`,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  );

  // creating refresh token
  const refreshToken: string = jwt.sign(
    { id: userData._id },
    `${process.env.REFRESH_TOKEN_SECRET}`,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
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
      message: "User created successfully",
      userData,
      accessToken,
    });
});

/*
@user login
@Post request
@params = userName or email, password
*/
const login = asyncHandler(async (request: Request, response: Response) => {
  const { userName, email, password } = request.body;

  if ((!userName && !email) || !password) {
    return response.status(statusCodes.ALL_FEILDS_REQURED).json({
      message:
        "All parameters are required -- either (userName & password) or (email &password)",
      parameters: "userName or email, password",
    });
  }

  const user = await User.findOne({
    $or: [{ email }, { userName }],
  });

  if (!user) {
    return response.status(statusCodes.USER_NOT_FOUND).json({
      message: "User not found",
    });
  }

  // password decyption
  const isVerified: boolean = await bcrypt.compare(password, user.password);
  if (!isVerified) {
    return response.status(statusCodes.INVALID).json({
      message: "Invalid Password",
    });
  }

  const userData = await User.findById(user._id).select("-password");

  if (!userData) {
    return response.status(statusCodes.DB_ERRORS).json({
      message: "Unable to login",
    });
  }

  // creating access token
  const accessToken: string = jwt.sign(
    { id: userData._id },
    `${process.env.ACCESS_TOKEN_SECRET}`,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  );

  // creating refresh token
  const refreshToken: string = jwt.sign(
    { id: userData._id },
    `${process.env.REFRESH_TOKEN_SECRET}`,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
  );

  const options = {
    httpOnly: true,
    secure: true,
    sameSite: false,
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  };

  response
    .status(statusCodes.USER_LOGGEDIN)
    .cookie("refreshToken", refreshToken, options)
    .json({
      message: "User logged in successfully",
      userData,
      accessToken,
    });
});

/*
@logout current user
@get request
@params = none
*/
const logout = asyncHandler(async (request: Request, response: Response) => {
  const cookies = request.cookies;
  if (!cookies) {
    return response.status(statusCodes.NOT_FOUND).json({
      message: "Cookie not found",
    });
  }

  const options = {
    httpOnly: true,
    secure: true,
  };

  response
    .status(statusCodes.SUCCESS)
    .clearCookie("refreshToken", options)
    .json({
      message: "User logged out successfully",
    });
});

/*
@get current user
@get request
@params = none
*/
const getCurrentUser = asyncHandler(
  async (request: Request, response: Response) => {
    // request.user is from middleware
    const userData = await User.findById(request.user._id).select("-password");

    if (!userData) {
      return response.status(statusCodes.USER_NOT_FOUND).json({
        message: "User not found",
      });
    }

    response.status(statusCodes.SUCCESS).json({
      message: "User fetched successfully",
      userData,
    });
  }
);

export { signUp, login, logout, getCurrentUser };
