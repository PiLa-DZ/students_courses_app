# Stap 1
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

# Stap 2
1. **Create Home endPoint:** /
2. **Make server listening:** on port 3000
