const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");

const Message = require("../../models/Message");
const User = require("../../models/User");

// @route    POST api/message
// @desc     Create a message
// @access   Private
router.post(
  "/",
  [auth, [check("text", "Text is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");

      const newMessage = new Message({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      });

      const message = await newMessage.save();

      res.json(message);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route    GET api/messages
// @desc     Get all messages
// @access   Private
router.get("/", auth, async (req, res) => {
  try {
    const messages = await Message.find().sort({ date: -1 });
    res.json(messages);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    GET api/message/:id
// @desc     Get message by ID
// @access   Private
router.get("/:id", auth, async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);

    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/) || !message) {
      return res.status(404).json({ msg: "Message not found" });
    }

    res.json(message);
  } catch (err) {
    console.error(err.message);

    res.status(500).send("Server Error");
  }
});

// @route    DELETE api/message/:id
// @desc     Delete a message
// @access   Private
router.delete("/:id", auth, async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);

      if (!req.params.id.match(/^[0-9a-fA-F]{24}$/) || !message) {
      return res.status(404).json({ msg: "Post not found" });
    }

    // Check user
    if (message.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    await message.remove();

    res.json({ msg: "Post removed" });
  } catch (err) {
    console.error(err.message);

    res.status(500).send("Server Error");
  }
});

module.exports = router;
