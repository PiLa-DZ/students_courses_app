import db from "../db.js";

// "Create EndPoint API For 'Student Join new course'"
// **Create Post Method on app.js:** /api/v1/studunt-join-new-course
// student-join-new-course
export const studentJoinNewCourse = async (req, res) => {
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
};

// "Create EndPoint API For 'Get Stutent Courses'"
// **Create Get Method on app.js:** /api/v1/get-student-courses
// get-student-courses/:id
export const getStudentCourses = async (req, res) => {
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
};

// "Create EndPoint API For 'Student Exit Courses'"
// **Create Delete Method on app.js:** /api/v1/student-exit-course
// student-exit-course
export const studentExitCourse = async (req, res) => {
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
};
