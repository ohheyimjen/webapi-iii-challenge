const express = require('express');
const Posts = require('./postDb');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const posts = await Posts.find(req.query);
    res.status(200).json(posts);
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: 'Error retrieving the posts',
    });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const post = await Posts.findById(req.params.id);

    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: 'Error retrieving the post',
    });
  }
});

router.post('/', async (req, res) => {
  try {
    const post = await Posts.add(req.body);
    res.status(201).json(post);
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: 'Error adding the post',
    });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const count = await Posts.remove(req.params.id);
    if (count > 0) {
      res.status(200).json({ message: 'The post has been nuked' });
    } else {
      res.status(404).json({ message: 'The post could not be found' });
    }
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: 'Error removing the post',
    });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const post = await Posts.update(req.params.id, req.body);
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: 'The post could not be found' });
    }
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: 'Error updating the post',
    });
  }
});

// add an endpoint that returns all the messages for a hub
// this is a sub-route or sub-resource
router.get('/:id/messages', async (req, res) => {
  try {
    const messages = await Posts.findUserMessages(req.params.id);

    res.status(200).json(messages);
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: 'Error getting the messages for the post',
    });
  }
});

// add an endpoint for adding new message to a hub
router.post('/:id/messages', async (req, res) => {
  const messageInfo = { ...req.body, user_id: req.params.id };

  try {
    const message = await Posts.addMessage(messageInfo);
    res.status(210).json(message);
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: 'Error getting the messages for the posts',
    });
  }
});

module.exports = router;