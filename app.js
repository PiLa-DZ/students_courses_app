import db from "./db.js";
import express from "express";
import studentsRouter from "./routes/students_routes.js";
import courserRouter from "./routes/courses_routes.js";
import takingCoursesRouter from "./routes/taking_courses_routes.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Welcom to home page" });
});

// Create EndPoint API For 'Create New Student'
// "Create EndPoint API For 'Get One Student by id'"
// "Create EndPoint API For 'Update One Student by id'"
// "Create EndPoint API For 'Delete One Student by id'"
app.use("/api/v1/", studentsRouter);

// "Create EndPoint API For 'Create New course'"
// "Create EndPoint API For 'Get All Courses'"
// "Create EndPoint API For 'Update One Course by id'"
// "Create EndPoint API For 'Delete One Course by id'"
app.use("/api/v1/", courserRouter);

// -----------------------------------------------------------
// "Create EndPoint API For 'Student Join new course'"
// **Create Post Method on app.js:** /api/v1/studunt-join-new-course
// -----------------------------------------------------------
// "Create EndPoint API For 'Get Stutent Courses'"
// **Create Get Method on app.js:** /api/v1/get-student-courses
// -----------------------------------------------------------
// "Create EndPoint API For 'Stutent Exit Courses'"
// **Create Delete Method on app.js:** /api/v1/student-exit-course
app.use("/api/v1/", takingCoursesRouter);

app.listen(3000, () => {
  console.log(`Server listening on localhost:3000`);
});
