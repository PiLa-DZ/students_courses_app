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
