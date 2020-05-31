const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const User = require("../models/User");
const { check, validationResult } = require("express-validator");
const config = require("config");
const Project = require("../models/Project");

// @route   POST api/project/todos/:id
// @desc    Add Todos for a project
// @access  Private

router.post("/todos/:id", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    const project = await Project.findById(req.params.id);

    const newTodo = {
      todo: req.body.todo,
      user: req.user.id,
    };
    project.todos.unshift(newTodo);
    project.save();
    res.json({ project });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/project/todos/:id
// @desc    Get User Todos
// @access  Private
router.get("/todos/:id", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    const project = await Project.findById(req.params.id);

    const todos = project.todos;
    res.json({ todos });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error");
  }
});

// @route   DELETE api/project/todos/:id
// @desc    Get User Todos
// @access  Private
router.delete("/todos/:id/:todoId", auth, async (req, res) => {
  try {
    // const user =  await User.findById(req.user.id).select('-password')
    const project = await Project.findById(req.params.id);
    const todoId = req.params.todoId;

    // Pull out todo
    const todo = project.todos.find((todo) => todo.id === todoId);

    // Make sure todo exists
    if (!todo) {
      return res.status(404).json({ msg: "Todo Does not Found" });
    }
    // Check User
    if (todo.user.toString() !== req.user.id) {
      return res.status(404).json({ msg: "User not authorized !" });
    }
    // Get remove index
    const removeIndex = project.todos
      .map((todo) => todo.user.toString())
      .indexOf(req.user.id);
    const todos = project.todos.splice(removeIndex, 1)
    await project.save()
    res.json({todos})
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error");
  }
});

// @route   POST api/project
// @desc    Create or Update a Project Instance
// @access  Private

router.post(
  "/",
  [
    auth,
    [
      check("projectName", "Project Name is required").not().isEmpty(),
      check("title", "Project Title is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    // const projectId = req.params.projectId
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { projectName, title, description } = req.body;

    try {
      const newProject = {
        user: req.user.id,
        projectName,
        title,
        description,
      };
      const project = new Project({
        user: req.user.id,
        project: newProject,
      });
      project.save();
      res.json(project);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

router.get("/", auth, (req, res) => {
  Project.find({ user: req.user.id })
    .populate("user", "name")
    .exec((err, document) => {
      if (err) return res.status(404).json({ err });
      res.json(document);
    });
});

// Get all Project
router.get("/projects", async (req, res) => {
  const projects = await Project.find().populate("user", "name");
  // .select("-date")
  // .select("-_id");
  res.json(projects);
});

// Update a Project

router.put(
  "/:projectId",
  [
    auth,
    [
      check("projectName", "Project Name is required").not().isEmpty(),
      check("title", "Project Title is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const projectId = req.params.projectId;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { projectName, title, description } = req.body;
    let projectFields = {};
    projectFields.user = req.user.id;
    if (projectName) projectFields.projectName = projectName;
    if (title) projectFields.title = title;
    if (description) projectFields.description = description;
    let project = await Project.updateOne(
      { _id: projectId },
      { $set: { project: projectFields } },
      { new: true }
    );
    try {
      if (project) {
        return res.json(project);
      }
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }

    // try {
    //   if (project) {
    //     project = await Project.findOneAndUpdate(
    //       { _id: projectId },
    //       { $set: { projectFields } },
    //       { new: true }
    //     );
    //     return res.json(project);
    //   }
    //   if (!project) {
    //     res.json({ errors: [{ msg: "Project Not Found" }] });
    //   }
    // } catch (error) {
    //   console.error(error.message);
    //   res.status(500).send("Server Error");
    // }
  }
);

// Delete a Project
router.delete("/:projectId", [auth], async (req, res) => {
  const projectId = req.params.projectId;
  let project = await Project.find({ _id: projectId });
  try {
    if (project) {
      project = await Project.findOneAndRemove({ _id: projectId });
      return res.json({ msg: "Project Deleted" });
    }
    if (!project) {
      res.json({ errors: [{ msg: "Project Not Found" }] });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// Delete all Project
router.delete("/", [auth], async (req, res) => {
  await Project.deleteMany({ user: req.user.id });
  res.json({ msg: "Projects Deleted" });
});
module.exports = router;
