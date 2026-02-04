import {
  createNewCourse,
  getAllCourses,
  updateOneCourseById,
} from "../controllers/courses_controller.js";

import express from "express";

const router = express.Router();

// "Create EndPoint API For 'Create New course'"
router.post("/create-new-course", createNewCourse);
// "Create EndPoint API For 'Get All Courses'"
router.get("/get-all-courses", getAllCourses);
// "Create EndPoint API For 'Update One Course by id'"
router.put("/update-one-course/:id", updateOneCourseById);

export default router;
