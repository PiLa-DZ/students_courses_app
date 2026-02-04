import {
  createNewStudent,
  deleteOneStudentById,
  getOneStudentById,
  updateOneStudentById,
} from "../controllers/students_controller.js";

import express from "express";

const router = express.Router();

// Create EndPoint API For 'Create New Student'
router.post("/create-new-student", createNewStudent);
// "Create EndPoint API For 'Get One Student by id'"
router.get("/get-one-student/:id", getOneStudentById);
// "Create EndPoint API For 'Update One Student by id'"
router.put("/update-one-student/:id", updateOneStudentById);
// "Create EndPoint API For 'Update One Student by id'"
router.delete("/delete-one-student/:id", deleteOneStudentById);

export default router;
