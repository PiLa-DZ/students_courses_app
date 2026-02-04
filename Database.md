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
1. **Create Courses table using mariaDB local terminal**:
    ```SQL
    CREATE TABLE courses (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(100) NOT NULL UNIQUE
    );
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
