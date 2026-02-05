import {
  getStudentCourses,
  studentExitCourse,
  studentJoinNewCourse,
} from "../controllers/taking_courses_controller.js";

import express from "express";

const router = express.Router();

router.post("/student-join-new-course", studentJoinNewCourse);
router.get("/get-student-courses/:id", getStudentCourses);
router.delete("/student-exit-course", studentExitCourse);

export default router;
