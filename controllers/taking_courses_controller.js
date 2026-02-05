/* Now Script: Using Prisma ORM */
import prisma from "../prisma.js";

export const studentJoinNewCourse = async (req, res) => {
  try {
    const { student_id, course_id } = req.body;

    // We simply create a new record in the join table
    const result = await prisma.taking_courses.create({
      data: {
        student_id: Number(student_id),
        course_id: Number(course_id),
      },
    });

    res.status(201).json({
      message: "Student successfully joined the course!",
      data: result,
    });
  } catch (err) {
    // P2002: Student is already enrolled (Unique/Composite Key constraint)
    if (err.code === "P2002") {
      return res.status(400).json({
        message: "ERROR: This student is already enrolled in this course!",
      });
    }

    // P2003: Foreign Key constraint (Student ID or Course ID doesn't exist)
    if (err.code === "P2003") {
      return res.status(404).json({
        message:
          "ERROR: Either the Student ID or Course ID does not exist in the database.",
      });
    }

    console.error("Enrollment Error:", err.message);
    res.status(500).json({ message: "Error 500" });
  }
};

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
