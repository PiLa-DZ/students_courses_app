import db from "./db.js";
import express from "express";
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Welcom to home page" });
});

// Create EndPoint API For 'Create New Student'
app.post("/api/v1/create-new-student", async (req, res) => {
  try {
    const { first_name, last_name, user_name, email, age } = req.body;
    const query =
      "INSERT INTO students (first_name, last_name, user_name, email, age) VALUES (?, ?, ?, ?, ?)";
    const values = [first_name, last_name, user_name, email, age];
    const result = await db.query(query, values);
    res.json({ message: result });
  } catch (err) {
    res.json({ message: "Error 500, Internal Server Error" });
    console.error(
      `status 500, Internal server error from /api/v1/create-new-student`,
    );
  }
});

// "Create EndPoint API For 'Get One Student by id'"
app.get("/api/v1/get-one-student/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const query = "select * from students where id = ?";
    const params = [id];
    const [[result]] = await db.query(query, params);
    res.json(result);
  } catch (err) {
    res.json({ message: "Error 500, Internal Servere Erro" });
    console.error(
      `Error 500, Internal Server Error, From /api/v1/get-one-student EndPoint`,
    );
  }
});

// "Create EndPoint API For 'Update One Student by id'"
app.put("/api/v1/update-one-student/:id", async (req, res) => {
  try {
    const { first_name, last_name, user_name, email, age } = req.body;
    const id = Number(req.params.id);
    const query =
      "update students set first_name = ?, last_name = ?, user_name = ?, email = ?, age = ? where id = ?";
    const values = [first_name, last_name, user_name, email, age, id];
    await db.query(query, values);
    const read = await db.query("select * from students where id = ?", [id]);
    res.json(read[0][0]);
  } catch (err) {
    res.json({ message: "Error 500" });
    console.log(`From /api/v1/update-one-student ${err.message}`);
  }
});

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
    const checkIfNameExists = await db.query(
      "select * from courses where name = ?",
      [name],
    );
    if (checkIfNameExists) {
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
    const [[result]] = await db.query(query);
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

app.listen(3000, () => {
  console.log(`Server listening on localhost:3000`);
});
