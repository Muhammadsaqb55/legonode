const { default: mongoose } = require("mongoose")

const commentSchema = new mongoose.Schema({
  userId: String,
  blogId:String,
  comment_description: String,
  created_at:String,
})

// Define the comment model
const commentData = mongoose.model("comments", commentSchema)
module.exports = commentData