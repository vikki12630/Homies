import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  name: string;
  userName: string;
  email: string;
  password: string;
  profileImg?: string;
  followers?: string[];
  following?: string[];
  createdAt?: string;
  updatedAt?: string;
}

const userSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    userName: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profileImg: { type: String, default: "" },
    follower: { type: [String], default: [] },
    following: { type: [String], default: [] },
  },
  { timestamps: true }
);

// export const User:Model<IUser> = mongoose.model("User", userSchema)
export const User = mongoose.model<IUser>("User", userSchema);