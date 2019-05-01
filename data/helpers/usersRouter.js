const express = require('express');
const Users = require('./userDb');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const users = await Users.find(req.query);
    res.status(200).json(users);
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: 'Error retrieving the users',
    });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const hub = await Hubs.findById(req.params.id);

    if (hub) {
      res.status(200).json(hub);
    } else {
      res.status(404).json({ message: 'Hub not found' });
    }
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: 'Error retrieving the hub',
    });
  }
});

router.post('/', async (req, res) => {
  try {
    const user = await Users.add(req.body);
    res.status(201).json(user);
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: 'Error adding the user',
    });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const count = await Users.remove(req.params.id);
    if (count > 0) {
      res.status(200).json({ message: 'The user has been nuked' });
    } else {
      res.status(404).json({ message: 'The user could not be found' });
    }
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: 'Error removing the user',
    });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const user = await Users.update(req.params.id, req.body);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'The user could not be found' });
    }
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: 'Error updating the user',
    });
  }
});

// add an endpoint that returns all the messages for a hub
// this is a sub-route or sub-resource
router.get('/:id/messages', async (req, res) => {
  try {
    const messages = await Users.findUserMessages(req.params.id);

    res.status(200).json(messages);
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: 'Error getting the messages for the user',
    });
  }
});

// add an endpoint for adding new message to a hub
router.post('/:id/messages', async (req, res) => {
  const messageInfo = { ...req.body, user_id: req.params.id };

  try {
    const message = await Users.addMessage(messageInfo);
    res.status(210).json(message);
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: 'Error getting the messages for the user',
    });
  }
});

module.exports = router;