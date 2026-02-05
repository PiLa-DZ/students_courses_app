import {
  createNewStudent,
  deleteOneStudentById,
  getOneStudentById,
  updateOneStudentById,
} from "../controllers/students_controller.js";

import express from "express";

const router = express.Router();

router.post("/create-new-student", createNewStudent);
router.get("/get-one-student/:id", getOneStudentById);
router.put("/update-one-student/:id", updateOneStudentById);
router.delete("/delete-one-student/:id", deleteOneStudentById);

export default router;
