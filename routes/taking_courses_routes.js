import {
  getStudentCourses,
  studentExitCourse,
  studentJoinNewCourse,
} from "../controllers/taking_courses_controller.js";

import express from "express";

const router = express.Router();

// "Create EndPoint API For 'Student Join new course'"
// **Create Post Method on app.js:** /api/v1/studunt-join-new-course
router.post("/student-join-new-course", studentJoinNewCourse);

// "Create EndPoint API For 'Get Stutent Courses'"
// **Create Get Method on app.js:** /api/v1/get-student-courses
router.get("/get-student-courses/:id", getStudentCourses);

// "Create EndPoint API For 'Student Exit Courses'"
// **Create Delete Method on app.js:** /api/v1/student-exit-course
// student-exit-course
router.delete("/student-exit-course", studentExitCourse);

export default router;
