import { Router } from "express";
import {
  getCurrentUser,
  login,
  logout,
  refreshAccessToken,
  signUp,
} from "../controllers/userControllers";
import verifyJWT from "../middlewares/authMiddleware";

const router = Router();
// public routes
router.route("/signup").post(signUp);
router.route("/login").post(login);
router.route("/refreshaccesstoken").get(refreshAccessToken);

// secured routes
router.route("/logout").get(verifyJWT, logout);
router.route("/getcurrentuser").get(verifyJWT, getCurrentUser);

export default router;
