/* Now Script: Using Prisma ORM */
import prisma from "../prisma.js";

export const getAllCourses = async (req, res) => {
  try {
    const result = await prisma.courses.findMany();
    res.json(result);
  } catch (err) {
    console.error("Error with Prisma getAllCourses:", err.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const createNewCourse = async (req, res) => {
  try {
    const { name } = req.body;
    const newCourse = await prisma.courses.create({ data: { name } });
    res.status(201).json(newCourse);
  } catch (err) {
    // Prisma error code for "Unique constraint failed"
    if (err.code === "P2002") {
      return res
        .status(400)
        .json({ message: "ERROR: Course already exists!!!" });
    }
    res.status(500).json({ message: "Error 500" });
  }
};

export const updateOneCourseById = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { name } = req.body;

    const updatedCourse = await prisma.courses.update({
      where: { id: id },
      data: { name },
    });

    res.json({ message: "Update OK", course: updatedCourse });
  } catch (err) {
    if (err.code === "P2025") {
      return res.status(404).json({ message: "Wrong ID: Course not found" });
    }
    if (err.code === "P2002") {
      return res
        .status(400)
        .json({ message: "Error: That course name already exists!" });
    }
    console.error("Update Course Error:", err.message);
    res.status(500).json({ message: "Error 500" });
  }
};

export const deleteOneCoruseById = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const result = await prisma.courses.delete({
      where: { id: id },
    });

    res.json({ message: `Delete course OK`, deleted: result.name });
  } catch (err) {
    if (err.code === "P2025") {
      return res.status(404).json({ message: "ERROR: ID does not exist!!!" });
    }
    // If the course has students, the DB might prevent deletion due to Foreign Keys
    if (err.code === "P2003") {
      return res.status(400).json({
        message: "Cannot delete: Students are still enrolled in this course!",
      });
    }
    console.error("Delete Course Error:", err.message);
    res.status(500).json({ message: "Error: 500" });
  }
};
