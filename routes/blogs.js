const express = require('express');
const router = express.Router();
const Blogs = require('../models/blogs.model');

//Show all Blogs
router.route('/').get((req, res) => {
  Blogs.find()
    .then((blog) => res.json(blog))
    .catch((err) => res.status(400).json(`Error ${err}`));
});

//Add a Blog
router.route('/add').post((req, res) => {
  const username = req.body.username;
  const title = req.body.title;
  const description = req.body.description;
  const date = Date.parse(req.body.date);
  const pic = req.body.pic;

  const newBlog = new Blogs({
    username,
    title,
    description,
    date,
    pic,
  });

  newBlog
    .save()
    .then(() => res.json('Blog added successfully'))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

//Show individual Blog
router.route('/:id').get((req, res) => {
  Blogs.findById(req.params.id)
    .then((blog) => res.json(blog))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

//Delete a blog
router.route('/:id').delete((req, res) => {
  Blogs.findByIdAndDelete(req.params.id)
    .then(() => res.json('Blog Deleted!'))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

//Update a Blog
router.route('/update/:id').post((req, res) => {
  Blog.findById(req.params.id)
    .then((blog) => {
      blog.username = req.body.username ? req.body.username : blog.username;
      blog.title = req.body.title ? req.body.title : blog.title;
      blog.description = req.body.description
        ? req.body.description
        : blog.description;
      blog.date = Date.parse(req.body.date)
        ? Date.parse(req.body.date)
        : blog.date;
      blog.pic = req.body.pic ? req.body.pic : blog.pic;

      blog
        .save()
        .then(() => res.json('Blog   Updated!'))
        .catch((err) => res.status(400).json(`Error: ${err}`));
    })
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

module.exports = router;
