const express = require("express");
const router = express.Router();
const fetchUsers = require("../middleware/fetchUser");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");

// Route 1: get all the notes :GET "/api/notes/fetchallnotes" . login required

router.get("/fetchallnotes", fetchUsers, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json({ notes });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error ");
  }
});

// Route 2:Add a new note using post    :POST "/api/notes/addnote" . login required

router.post(
  "/addnote",
  fetchUsers,
  [
    body("title").isLength({ min: 3 }).withMessage("Enter a valid title"),
    body("description")
      .isLength({ min: 5 })
      .withMessage("Enter description at least of 5 character "),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;

      // If there are errors, return Bad request and the errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error ");
    }
  }
);

// Route 3:Update an existing  note using put   :PUT "/api/notes/updatenote" . login required

router.put("/updatenote/:id", fetchUsers, [], async (req, res) => {
  // get title , description and tag of note from req.body
  const { title, description, tag } = req.body;
  try {
    //create a newNote Object and add the thing which we have received in req.body
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    // Find the Note to be updated and update it
    // const note = Notes.findByIdAndUpdate();

    // find the note by id which is inside req.params
    let note = await Notes.findById(req.params.id);
    // if note does not exist
    if (!note) {
      res.status(401).send("Oops !! Note Not Found !!");
    }
    // if not exist but does not belong to the user
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed ");
    }

    // update the note
    note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error ");
  }
});

// Route 4:Delete  an existing  note using delete   :DELETE "/api/notes/deletenote" . login required

router.delete("/deletenote/:id", fetchUsers, [], async (req, res) => {
  try {
    // Find the Note to be deleted  and delete it
    // const note = Notes.findByIdAndUpdate();

    // find the note by id which is inside req.params
    let note = await Notes.findById(req.params.id);
    // if note does not exist
    if (!note) {
      res.status(401).send("Oops !! Note Not Found !!");
    }
    // Allow deletion only if user owes this note
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed ");
    }

    // update the note
    note = await Notes.findByIdAndDelete(req.params.id);
    res.json({ Success: "Note has been deleted", note: note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error !! ");
  }
});

module.exports = router;
