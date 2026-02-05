/* Now Script: Using Prisma ORM */
import prisma from "../prisma.js";

export const createNewStudent = async (req, res) => {
  try {
    const { first_name, last_name, user_name, email, age } = req.body;

    const newStudent = await prisma.students.create({
      data: {
        first_name,
        last_name,
        user_name,
        email,
        age: Number(age),
      },
    });

    res.status(201).json(newStudent);
  } catch (err) {
    // Handling Unique Constraint (e.g., user_name or email already exists)
    if (err.code === "P2002") {
      return res.status(400).json({
        message: `ERROR: The ${err.meta.target} is already taken!`,
      });
    }
    console.error("Create Student Error:", err.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getOneStudentById = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const getStudent = await prisma.students.findUnique({ where: { id: id } });
    if (!getStudent) {
      return res.status(404).json({ message: "Not foud" });
    }
    res.status(200).json(getStudent);
  } catch (err) {
    res.status(500).json({ message: "Error 500" });
  }
};

export const updateOneStudentById = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { first_name, last_name, user_name, email, age } = req.body;

    const updatedStudent = await prisma.students.update({
      where: { id: id },
      data: {
        first_name,
        last_name,
        user_name,
        email,
        age: age ? Number(age) : undefined, // Ensure age is a number
      },
    });

    res.json(updatedStudent);
  } catch (err) {
    if (err.code === "P2025") {
      return res.status(404).json({ message: "Student not found" });
    }
    console.log(`Update Error: ${err.message}`);
    res.status(500).json({ message: "Error 500" });
  }
};

export const deleteOneStudentById = async (req, res) => {
  try {
    const id = Number(req.params.id);

    await prisma.students.delete({
      where: { id: id },
    });

    res.json({ message: "Student deleted successfully" });
  } catch (err) {
    if (err.code === "P2025") {
      return res.status(404).json({ message: "ERROR: Student ID not found!" });
    }
    console.error("Delete Student Error:", err.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
