1. Stage 1
    1. Create project directory: 
    ``` Bash
    mkdir students_courses_app
    cd students_courses_app
    ```
    2. Create Git:
    ``` Bash
    git init
    ```
    3. Create package.json:
    ``` Bash
    npm init -y
    ```
    4. Install Modules: 
    ``` Bash
    npm install exprees mysql2
    ```
    5. Install Dev Modules: 
    ``` Bash
    npm install -D nodemon
    ```
    6. Create db module to connect to local Database:
    ``` Bash
    touch db.js
    ```
    7. Create pool on db.js moule:
    ``` JavaScript
    const pool = mysql.createPool({...})
    ```
    8. Create main file:
    ``` Bash
    touch app.js
    ```
    9. Import db.js module on app.js:
    ``` JavaScript
    import db from "./db.js";
    ```
    10. Create database using mariaDB local terminal:
    ``` Bash
    mysql -u admin -p
    create database Students_Courses_DB;
    ```
    11. Test Connect to database:
    ``` Bash
    npm start
    ```
    12. Add gitignore and node_module directory to gitignore:
    ``` Bash
    touch .gitignore
    ```
    13. Frist commit: First connect to my local Database
    ```Bash
    git add .
    git commit -m "Frist commit: First connect to my local Database"
    ```
