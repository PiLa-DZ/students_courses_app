import express from "express";
import studentsRouter from "./routes/students_routes.js";
import courserRouter from "./routes/courses_routes.js";
import takingCoursesRouter from "./routes/taking_courses_routes.js";

const app = express();

app.use(express.json());

app.use("/api/v1/", studentsRouter);
app.use("/api/v1/", courserRouter);
app.use("/api/v1/", takingCoursesRouter);

app.listen(3000, () => {
  console.log(`Server listening on localhost:3000`);
});
