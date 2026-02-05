import {
  createNewCourse,
  deleteOneCoruseById,
  getAllCourses,
  updateOneCourseById,
} from "../controllers/courses_controller.js";

import express from "express";

const router = express.Router();

router.post("/create-new-course", createNewCourse);
router.get("/get-all-courses", getAllCourses);
router.put("/update-one-course/:id", updateOneCourseById);
router.delete("/delete-one-course/:id", deleteOneCoruseById);

export default router;
