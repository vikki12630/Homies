import { asyncHandler } from "../utils/asyncHandler";
import jwt from "jsonwebtoken";
import { IUser, User } from "../models/userModel";
import { Request, Response, NextFunction } from "express";
import { statusCodes } from "../utils/statusCodes";

const verifyJWT = asyncHandler(
  async (request: Request, response: Response, next: NextFunction) => {
    const authHeader = request.headers.authorization;

    if (
      !authHeader ||
      (!authHeader.startsWith("Bearer ") && !authHeader.startsWith("bearer "))
    ) {
      return response.status(statusCodes.NOT_FOUND).json({
        message: "Auth header token not found",
      });
    }

    const token = authHeader.split(" ")[1];

    const auth = jwt.verify(token, `${process.env.ACCESS_TOKEN_SECRET}`) as {
      id: string;
    };

    const user = await User.findById(auth.id);

    if (!user) {
      return response.status(statusCodes.USER_NOT_FOUND).json({
        message: "User not found",
      });
    }

    request.user = user;
    next();
  }
);

export default verifyJWT;
