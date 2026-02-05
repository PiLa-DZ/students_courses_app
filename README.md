# All API EndPoints

## Create New Student
http post localhost:3000/api/v1/create-new-student first_name=Nabil user_name=Nabil email=nabil@gmail.com age:=35
## Get One Student By ID
http localhost:3000/api/v1/get-one-student/:id
## Update One Student By ID
http put localhost:3000/api/v1/update-one-student/1 first_name=a last_name=b user_name=c email=d age:=22
## Delete One Student By ID
http delete localhost:3000/api/v1/delete-one-student/6

## Create New Course
http post localhost:3000/api/v1/create-new-course name=Python
## Get All Courses
http localhost:3000/api/v1/get-all-courses
## Update One Course By ID
http put localhost:3000/api/v1/update-one-course/8 name="C++"
## Delete One Course By ID
http delete localhost:3000/api/v1/delete-one-course/16

## Student Join New Course
http post localhost:3000/api/v1/student-join-new-course student_id:=2 course_id:=18
## Get Student Courses
http localhost:3000/api/v1/get-student-courses/2
## Student Exit Course
http delete localhost:3000/api/v1/student-exit-course student_id:=2 course_id:=16













# Database Scripts
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
