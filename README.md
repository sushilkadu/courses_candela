# Courses

To run the project, perform following actions.

- npm install
- MONGO_URI environment variable need to be set before the code can be executed. Please see section on mongo for setting it up.
- npm start
- To run testcases, you can run npm test

# Mongo setup

Basically, I'm using cloud.mongo.com service for setting up NqSQL databse.
You can setup cloud.mongo using following steps

- Open cloud.mongo.com
- Signup/SignIn
- Create a new project
- Create a new DB
- Open "Connect" section and copy the url to connect to DB
- Run this command `export MONGO_URI=<<<URI>>>`
