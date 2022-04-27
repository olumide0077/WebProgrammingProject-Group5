# WebProgrammingProject-Group5

This repository is for Web programming project

## Documents
Design and instructions documents can be found under **documents** folder

## Rest api documentation

We have hosted REST api documentation using swagger which is accessible by [Swagger URL](https://rest-api-webproject.herokuapp.com/api-docs/)
for example to get products we can use following command
```
https://rest-api-webproject.herokuapp.com/products
```
### Rest API deployment
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
