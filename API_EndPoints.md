# Home:
```Bash
http localhost:3000/
```
# Create New Student
```Bash
http post localhost:3000/api/v1/create-new-student first_name=Nabil user_name=Nabil email=nabil@gmail.com age:=35
```
# Get One Student By ID
```Bash
http localhost:3000/api/v1/get-one-student/:id
```
# Update One Student By ID
```Bash
http put localhost:3000/api/v1/update-one-student/1 first_name=a last_name=b user_name=c email=d age:=22
```
# Delete One Student By ID
```Bash
http delete localhost:3000/api/v1/delete-one-student/6
```
