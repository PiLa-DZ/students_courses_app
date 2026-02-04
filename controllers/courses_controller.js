import db from "../db.js";

// "Create EndPoint API For 'Get All Courses'"
export const getAllCourses = async (req, res) => {
  try {
    const query = "select * from courses";
    const [result] = await db.query(query);
    res.json(result);
  } catch (err) {
    res.json({ message: "Error: 5000" });
    console.error("Error 500, /api/v1/get-all-courses", err.message);
  }
};

// "Create EndPoint API For 'Create New course'"
export const createNewCourse = async (req, res) => {
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
};

// "Create EndPoint API For 'Update One Course by id'"
export const updateOneCourseById = async (req, res) => {
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
};

// "Create EndPoint API For 'Delete One Course by id'"
export const deleteOneCoruseById = async (req, res) => {
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
};
