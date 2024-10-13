import { timeStamp } from "console";
import mongoose, { Document, Model, Schema } from "mongoose";

export interface IPost extends Document {
  postedBy: mongoose.Schema.Types.ObjectId;
  publicId: string;
  likes: mongoose.Schema.Types.ObjectId[];
  text?: string;
  postImage?: string;
  createdAt: Date;
  updatedAt: Date;
}

const postSchema: Schema<IPost> = new Schema(
  {
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    publicId: {
      type: String,
      required: true,
    },
    likes: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },
    text: {
      type: String,
    },
    postImage: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Post: Model<IPost> = mongoose.model<IPost>("Post", postSchema);
