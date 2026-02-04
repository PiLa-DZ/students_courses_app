import db from "../db.js";

// Create EndPoint API For 'Create New Student'
export const createNewStudent = async (req, res) => {
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
      err.message,
    );
  }
};

// "Create EndPoint API For 'Get One Student by id'"
export const getOneStudentById = async (req, res) => {
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
};

export const updateOneStudentById = async (req, res) => {
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
};
