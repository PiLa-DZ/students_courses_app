import mysql from "mysql2";

const pool = mysql.createPool({
  host: "localhost",
  user: "admin",
  password: "your_password",
  database: "Students_Courses_DB",
});

console.log("Connect to Database");

export default pool.promise();
