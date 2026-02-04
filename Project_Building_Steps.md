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
1. **Create Post Method on app.js:** /api/v1/create-new-student

# Step 5 "Create EndPoint API For 'Get One Student by id'"
1. **Create Get Method on app.js:** /api/v1/get-one-student:id

# Step 6 "Create EndPoint API For 'Update One Student by id'"
1. **Create Put Method on app.js:** /api/v1/update-one-student/:id

# Step 7 "Create EndPoint API For 'Delete One Student by id'"
1. **Create Delete Method on app.js:** /api/v1/delete-one-student/:id
2. **Check if we have this student with this id:** result.affectedRows

# Step 8 "Create Courses Table"
1. **Create Courses table using mariaDB local terminal**:
    ```SQL
    CREATE TABLE courses (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(100) NOT NULL UNIQUE
    );
    ```

# Step 9 "Create EndPoint API For 'Create New course'"
1. **Create Post Method on app.js:** /api/v1/create-new-course
2. **Check if course already exists on app.js:** Search by name in Database

# Step 10 "Create EndPoint API For 'Get All Courses'"
1. **Create Get Method on app.js:** /api/v1/get-all-courses

# Step 11 "Create EndPoint API For 'Update One Course by id'"
1. **Create Put Method on app.js:** /api/v1/update-one-course/:id
2. **Check if we have this course with this id:** result.affectedRows

# Step 12 "Create EndPoint API For 'Delete One Course by id'"
1. **Create Delete Method on app.js:** /api/v1/delete-one-course/:id
2. **Check if we have this course with this id:** result.affectedRows

# Step 13 Fix Bugs on app.js on 'Create New Course' and 'Get All Courses'
1. "Create EndPoint API For 'Create New course'"
    - The Problem:
        - Any time i try to add new course it's say { message: "EROOR: Course already exists!!!" }
    - The Solution:
        - instead `const checkIfNameExists` i do `const [checkIfNameExists]` to select index 0 of array
        - Instead `if(checkIfNameExists)` i do `if(checkIfNameExists.length !== 0)` to check if array is not empty
2. "Create EndPoint API For 'Get All Courses'"
    - The Problem:
        - Any time i try to get-all-courses it's prinst just first course
    - The Solution:
        - You're select first index in first index here `const [[result]] = await db.query(query);` just like this `result[0][0]`
        - I change it to this `const [result] = await db.query(query);` now it's like this `result[0]`

# Step 14 Create Junction Table for students and courses
1. **Create taking_courses table using mariaDB local terminal**:
    ```SQL
    CREATE TABLE taking_courses (
        student_id INT,
        course_id INT,
        PRIMARY KEY (student_id, course_id),
        CONSTRAINT fk_student FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
        CONSTRAINT fk_course FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
    );
    ```

# Step 15 "Create EndPoint API For 'Student Join new course'"
1. **Create Post Method on app.js:** /api/v1/studunt-join-new-course
2. **check If Course ID Exists:** `checkIfCourseExists.length === 0`
2. **check If Student ID Exists:** `checkIfStudentExists.length === 0`

# Step 16 "Create EndPoint API For 'Get Stutent Courses'"
1. **Create Get Method on app.js:** /api/v1/get-student-courses
2. **Check if we have this student with this id:** `if (checkIfStudentExists.length === 0)`

# Step 17 "Create EndPoint API For 'Stutent Exit Courses'"
1. **Create Delete Method on app.js:** /api/v1/student-exit-course
2. **Check if we have this taking_courses with this (student_id, course_id):** `if (checkIfTakingCourseExists.length === 0)`

# Step 18 "Move 'Create New Student' EndPoint Script From app.js to controllers and routes"
1. **Create controllers directory:** mkdir controllers
2. **Create students_controller file:** touch controllers/students_controller.js
3. **Create routes directory:** mkdir routes
4. **Create students_routes file:** touch routes/students_routes.js
5. **Move 'Create New Student' EndPoint Script From app.js to controllers and routes"**

# Step 19 "Move 'Get One Student by id' EndPoint Script From app.js to controllers and routes"
1. **Move 'Get One Student by id' EndPoint Script From app.js to controllers and routes"**

# Step 19 "Move 'Update One Student by id' EndPoint Script From app.js to controllers and routes"
1. **Move 'Update One Student by id' EndPoint Script From app.js to controllers and routes"**

# Step 19 "Move 'Delete One Student by id' EndPoint Script From app.js to controllers and routes"
1. **Move 'Delete One Student by id' EndPoint Script From app.js to controllers and routes"**

# Step 19 "Move 'Create New Course' EndPoint Script From app.js to controllers and routes"
1. **Move 'Create New Course' EndPoint Script From app.js to controllers and routes"**
