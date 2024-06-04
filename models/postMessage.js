import mongoose from "mongoose";

// defining schema for db
const postSchema = mongoose.Schema({
  title: String,
  message: String,
  creator: String,
  tags: [String],
  likeCount: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  selectedFile: String, // contains base64 of image
});

const PostMessage = mongoose.model("PostMessage", postSchema); // model creates with name PostMessage (check db)
export default PostMessage;
