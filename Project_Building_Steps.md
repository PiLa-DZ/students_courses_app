# Stap 1 Setup Project and Connect to Database
1. **Create project directory:** mkdir students_courses_app
2. **Create Git:** git init
3. **Create package.json:** npm init -y
4. **Install Modules:** npm install exprees mysql2
5. **Install Dev Modules:** npm install -D nodemon
6. **Create db module to connect to local Database:** touch db.js
7. **Create pool on db.js moule:** const pool = mysql.createPool({...})
8. **Create main file:** touch app.js
9. **Import db.js module on app.js:** import db from "./db.js";
10. **Create database using mariaDB local terminal:** mysql -u admin -p; create database Students_Courses_DB;
11. **Test Connect to database:** npm start
12. **Add gitignore and node_module directory to gitignore:** touch .gitignore
13. **Create Github repo:**
14. **Push local git to my Githup repo:** git push

# Stap 2 Create Home EndPoint and Run My Server
1. **Create Home endPoint:** /
2. **Make server listening:** on port 3000

# Step 3 "Create Students Table"
1. **Create students table using mariaDB local terminal**:
    ```SQL
    CREATE TABLE students (
        id INT PRIMARY KEY AUTO_INCREMENT,
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) default "Student",
        user_name VARCHAR(100) unique NOT NULL,
        email VARCHAR(100) unique NOT NULL,
        age INT NOT NULL,
        CONSTRAINT check_age CHECK (age >= 18)
    );
    ```

# Step 4 "Create EndPoint API For 'Create New Student'"
1. **Create Post Method on app.js:** /api/v1/create-new/student

# Step 5 "Create EndPoint API For 'Get One Student by id'"
1. **Create Get Method on app.js:** /api/v1/get-one-student:id

# Step 6 "Create EndPoint API For 'Update One Student by id'"
1. **Create Put Method on app.js:** /api/v1/update-one-student/:id

# Step 7 "Create EndPoint API For 'Delete One Student by id'"
1. **Create Delete Method on app.js:** /api/v1/delete-one-student/:id
2. **Check if we have this student with this id** result.affectedRows

# Step 3 "Create Courses Table"
1. **Create Courses table using mariaDB local terminal**:
    ```SQL
    CREATE TABLE courses (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(100) NOT NULL UNIQUE
    );
    ```
