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
