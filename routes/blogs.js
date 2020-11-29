const express = require('express');
const router = express.Router();
const Blog = require('../models/blog.model');

//Show All Exercises
router.route('/').get((req, res) => {
  Blog.find()
    .then((blogs) => res.json(blogs))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

//Add an Exercise
router.route('/add').post((req, res) => {
  const username = req.body.username;
  const heading = req.body.heading;
  const description = req.body.description;
  const imgLink = req.body.imgLink;
  const citation = req.body.citation;
  const date = Date.parse(req.body.date);
  const newBlog = new Blog({
    username,
    heading,
    description,
    imgLink,
    citation,
    date,
  });

  newBlog
    .save()
    .then(() => res.json('Blog added successfully'))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

//Show individual exercise
router.route('/:id').get((req, res) => {
  Blog.findById(req.params.id)
    .then((blog) => res.json(blog))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

//Delete an exercise
router.route('/:id').delete((req, res) => {
  Blog.findByIdAndDelete(req.params.id)
    .then(() => res.json('Blog Deleted!'))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

//Update an exercise
router.route('/update/:id').post((req, res) => {
  Blog.findById(req.params.id)
    .then((blog) => {
      blog.username = req.body.username ? req.body.username : blog.username;
      blog.heading = req.body.heading
        ? req.body.heading
        : blog.heading;
      blog.description = req.body.description
        ? req.body.description
        : blog.description;
      blog.imgLink = req.body.imgLink
        ? req.body.imgLink
        : blog.imgLink;
      blog.citation = req.body.citation
        ? req.body.citation
        : blog.citation;
      blog.date = Date.parse(req.body.date)
        ? Date.parse(req.body.date)
        : blog.date;

      blog
        .save()
        .then(() => res.json('Blog Updated!'))
        .catch((err) => res.status(400).json(`Error: ${err}`));
    })
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

module.exports = router;
