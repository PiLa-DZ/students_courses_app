import {
  createNewStudent,
  getOneStudentById,
} from "../controllers/students_controller.js";

import express from "express";

const router = express.Router();

router.post("/create-new-student", createNewStudent);
router.get("/get-one-student/:id", getOneStudentById);

export default router;
