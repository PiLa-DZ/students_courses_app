import db from "./db.js";
import express from "express";
import router from "./routes/students_routes.js";
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Welcom to home page" });
});

// Create EndPoint API For 'Create New Student'
// "Create EndPoint API For 'Get One Student by id'"
// "Create EndPoint API For 'Update One Student by id'"
app.use("/api/v1/", router);

// "Create EndPoint API For 'Delete One Student by id'"
app.delete("/api/v1/delete-one-student/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const query = "delete from students where id = ?";
    const params = [id];
    const [result] = await db.query(query, params);

    if (!result.affectedRows) {
      return res.json({ message: "EROOR: This ID is Wrong!!!" });
    }
    res.json({ message: "Delete OK", result: result.affectedRows });
  } catch (err) {
    res.json({ message: "Error 500" });
    console.error("Error 500", err.message);
  }
});

// "Create EndPoint API For 'Create New course'"
app.post("/api/v1/create-new-course", async (req, res) => {
  try {
    const { name } = req.body;
    const [checkIfNameExists] = await db.query(
      "select * from courses where name = ?",
      [name],
    );
    if (checkIfNameExists.length !== 0) {
      return res.json({ message: "EROOR: Course already exists!!!" });
    }
    const query = "insert into courses (name) values (?)";
    const values = [name];
    const [result] = await db.query(query, values);
    res.json(result);
  } catch (err) {
    res.json({ message: "Error 500" });
    console.error("/api/v1/create-new-course", err.message);
  }
});

// "Create EndPoint API For 'Get All Courses'"
app.get("/api/v1/get-all-courses", async (req, res) => {
  try {
    const query = "select * from courses";
    const [result] = await db.query(query);
    res.json(result);
  } catch (err) {
    res.json({ message: "Error: 5000" });
    console.error("Error 500, /api/v1/get-all-courses", err.message);
  }
});

// "Create EndPoint API For 'Update One Course by id'"
app.put("/api/v1/update-one-course/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { name } = req.body;
    const query = "update courses set name = ? where id = ?";
    const params = [name, id];
    const [result] = await db.query(query, params);

    if (!result.affectedRows) {
      return res.json({ message: "Wrong ID" });
    }
    res.json({ message: `Update OK: ${result.affectedRows}` });
  } catch (err) {
    res.json({ message: "Error 500" });
    console.error("Error 500, /api/v1/update-one-course/:id", err.message);
  }
});

// "Create EndPoint API For 'Delete One Course by id'"
app.delete("/api/v1/delete-one-course/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const [checkIfCourseExists] = await db.query(
      "select * from courses where id = ?",
      [id],
    );
    if (checkIfCourseExists.length === 0) {
      return res.status(400).json({ message: "ERROR: ID not exists!!!" });
    }
    const query = "delete from courses where id = ?";
    const params = [id];
    const [result] = await db.query(query, params);
    res.json({ message: `Delete course OK: ${result.affectedRows}` });
  } catch (err) {
    res.status(500).json({ message: "Error: 500" });
    console.error(`Error: 500, /api/v1/delete-one-course/:id ${err.message}`);
  }
});

// "Create EndPoint API For 'Student Join new course'"
// **Create Post Method on app.js:** /api/v1/studunt-join-new-course
app.post("/api/v1/student-join-new-course", async (req, res) => {
  try {
    const { student_id, course_id } = req.body;
    const [checkIfCourseExists] = await db.query(
      "select * from courses where id = ?",
      [course_id],
    );
    const [checkIfStudentExists] = await db.query(
      "select * from students where id = ?",
      [student_id],
    );
    if (checkIfCourseExists.length === 0 || checkIfStudentExists.length === 0) {
      return res.json({
        message: "EROOR: course_id or student_id not found !!!",
      });
    }

    const query =
      "insert into taking_courses (student_id, course_id) values (?, ?)";
    const values = [student_id, course_id];
    const [result] = await db.query(query, values);
    res.json(result);
  } catch (err) {
    res.json({ message: "Error 500" });
    console.error(`Error: 500 /api/v1/studunt-join-new-course ${err.message}`);
  }
});

// "Create EndPoint API For 'Get Stutent Courses'"
// **Create Get Method on app.js:** /api/v1/get-student-courses
app.get("/api/v1/get-student-courses/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    const [checkIfStudentExists] = await db.query(
      "select * from students where id = ?",
      [id],
    );
    if (checkIfStudentExists.length === 0) {
      return res.status(400).json({ message: "ERROR: ID not exists!!!" });
    }

    const query = `
        select courses.name as Course_Name
        from students
        join taking_courses on students.id = taking_courses.student_id
        join courses on taking_courses.course_id = courses.id
        where students.id = ?
      `;
    const params = [id];
    const [result] = await db.query(query, params);
    res.json(result);
  } catch (err) {
    res.josn({ message: "Error: 500" });
    console.error("Error: 500, /api/v1/get-student-courses/:id ", err.message);
  }
});

// "Create EndPoint API For 'Stutent Exit Courses'"
// **Create Delete Method on app.js:** /api/v1/student-exit-course
app.delete("/api/v1/student-exit-course", async (req, res) => {
  try {
    const { student_id, course_id } = req.body;

    const [checkIfTakingCourseExists] = await db.query(
      "select * from taking_courses where student_id = ? and course_id = ?",
      [student_id, course_id],
    );
    if (checkIfTakingCourseExists.length === 0) {
      return res
        .status(400)
        .json({ message: "ERROR: Taking Course Not Found!!!" });
    }

    const query =
      "delete from taking_courses where student_id = ? and course_id = ?";
    const params = [student_id, course_id];
    const result = db.query(query, params);
    res.json(result);
  } catch (err) {
    res.json({ message: "Error: 500" });
    console.error(`Error: 500  /api/v1/student-exit-course ${err.message}`);
  }
});

app.listen(3000, () => {
  console.log(`Server listening on localhost:3000`);
});
