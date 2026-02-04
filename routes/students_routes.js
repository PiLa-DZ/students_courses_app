import createNewStudent from "../controllers/students_controller.js";
import express from "express";
const router = express.Router();

router.post("/create-new-student", createNewStudent);

export default router;
