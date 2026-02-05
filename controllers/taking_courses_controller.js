/* Now Script: Using Prisma ORM */
import prisma from "../prisma.js";

export const getStudentCourses = async (req, res) => {
  try {
    const id = Number(req.params.id);

    // We find the student and "include" their courses through the join table
    const result = await prisma.students.findUnique({
      where: { id: id },
      include: {
        taking_courses: {
          include: {
            courses: true, // This grabs the actual course details (name, etc.)
          },
        },
      },
    });

    if (!result) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Clean up the data so the user just sees a list of names
    const courseNames = result.taking_courses.map((tc) => tc.courses.name);

    res.json({
      student: `${result.first_name} ${result.last_name}`,
      courses: courseNames,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching student courses" });
  }
};

export const studentExitCourse = async (req, res) => {
  try {
    const { student_id, course_id } = req.body;

    // In Prisma, deleting by a composite key requires this specific syntax
    const deletedRelation = await prisma.taking_courses.delete({
      where: {
        student_id_course_id: {
          student_id: Number(student_id),
          course_id: Number(course_id),
        },
      },
    });

    res.json({
      message: "Student successfully exited the course",
      deletedRelation,
    });
  } catch (err) {
    // P2025 is the Prisma error code for "Record to delete does not exist"
    if (err.code === "P2025") {
      return res
        .status(404)
        .json({ message: "ERROR: Student was not enrolled in this course!" });
    }

    console.error(err);
    res.status(500).json({ message: "Error 500" });
  }
};

/* Old Script: Using Prisma ORM */
import db from "../db.js";

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

// export const getStudentCourses = async (req, res) => {
//   try {
//     const id = Number(req.params.id);
//     const [checkIfStudentExists] = await db.query(
//       "select * from students where id = ?",
//       [id],
//     );
//     if (checkIfStudentExists.length === 0) {
//       return res.status(400).json({ message: "ERROR: ID not exists!!!" });
//     }
//     const query = `
//         select courses.name as Course_Name
//         from students
//         join taking_courses on students.id = taking_courses.student_id
//         join courses on taking_courses.course_id = courses.id
//         where students.id = ?
//       `;
//     const params = [id];
//     const [result] = await db.query(query, params);
//     res.json(result);
//   } catch (err) {
//     res.josn({ message: "Error: 500" });
//     console.error("Error: 500, /api/v1/get-student-courses/:id ", err.message);
//   }
// };

// "Create EndPoint API For 'Student Exit Courses'"
// export const studentExitCourse = async (req, res) => {
//   try {
//     const { student_id, course_id } = req.body;
//     const [checkIfTakingCourseExists] = await db.query(
//       "select * from taking_courses where student_id = ? and course_id = ?",
//       [student_id, course_id],
//     );
//     if (checkIfTakingCourseExists.length === 0) {
//       return res
//         .status(400)
//         .json({ message: "ERROR: Taking Course Not Found!!!" });
//     }
//     const query =
//       "delete from taking_courses where student_id = ? and course_id = ?";
//     const params = [student_id, course_id];
//     const result = await db.query(query, params);
//     res.json(result);
//   } catch (err) {
//     res.json({ message: "Error: 500" });
//     console.error(`Error: 500  /api/v1/student-exit-course ${err.message}`);
//   }
// };
