const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogsSchema = new Schema(
  {
    username: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date },
    pic: { type: String },
  },
  {
    timestamps: true,
  }
);

const Blogs = mongoose.model('Blogs', blogsSchema);
module.exports = Blogs;
