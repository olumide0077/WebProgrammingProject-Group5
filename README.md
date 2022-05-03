# WebProgrammingProject-Group5

This repository is for Web programming project
The Front end is hosted at : https://webprojectg5.herokuapp.com/
The Rest api is hosted at : https://rest-api-webproject.herokuapp.com

## Documents
Design and instructions documents can be found under **documents** folder

## Rest api documentation

We have hosted REST api documentation using swagger which is accessible by [Swagger URL](https://rest-api-webproject.herokuapp.com/api-docs/)
for example to get products we can use following command
```
https://rest-api-webproject.herokuapp.com/products
```
### Rest API deployment (for internal dev team only)
We have deployed our REST api on Heroku with base URL as https://rest-api-webproject.herokuapp.com and app name as "rest-api-webproject".
To clone this app in your local enviroment, please contact Harim Fatima Muzamil or Olumide for credentials or added as collaborator.
After that please run following commands in any folder.
```
heroku login
heroku git:clone -a rest-api-webproject
cd rest-api-webproject/
```
and to get PostgreSQL database url please run following command
```
heroku config:get DATABASE_URL
```

### Admin pages
Because of security issues, we are not linking admin pages to add data on website, admin would have access to those pages using following links
**To add User**

```
https://webprojectg5.herokuapp.com/admin/adduser.html
```
**To add Brand**

```
https://webprojectg5.herokuapp.com/admin/addbrand.html
```

**To add Product**
```
https://webprojectg5.herokuapp.com/admin/addproduct.html
```
