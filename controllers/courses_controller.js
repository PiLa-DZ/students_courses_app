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
