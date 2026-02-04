import { getAllCourses } from "../controllers/courses_controller.js";

import express from "express";

const router = express.Router();

// "Create EndPoint API For 'Get All Courses'"
router.get("/get-all-courses", getAllCourses);

export default router;
