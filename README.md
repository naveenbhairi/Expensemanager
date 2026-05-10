# #Project Title

### Expense Manager

# Problem Statement

1. Users should be able to view the following stats at the top followed by the transactions list
· Current balance
· Total income
· Total expense
2. Users should be able to view a list of transactions made in a month (By default current month should be selected, the option must be provided to change the month)
3. Users should be able to create a transaction with the following details
· Title
· Amount
· Transaction Type (Income/Expense)
· Date
· Note
4. Users should be able to edit or update all the properties of a transaction
5. Users should be able to delete a transaction
6. Whenever a user creates, updates, or deletes a transaction current balance, total income, and total expense should be updated in-home screen

# Solution Provided

A web application built with MERN Stack.

A smart and easy to use application that allows users to track and categorize their expenses.Expense Manager enables users to record daily transactions.With this application you can keep track of your finances by adding expenses and income and it also gives you the global balance.Users can also update/delete the transactions.

By login as admin one can view all the users list and their transactions data.

# Architecture Diagram

![image](https://user-images.githubusercontent.com/59720167/158769792-588ffe40-e301-4c17-acc6-ab072aa0d778.png)

# Technology / Frameworks used

This application uses ReactJs for front-end views and Nodejs/Expressjs framework for the backend apis. 

The data is stored with NoSQL database using MongoDB Atlas/mongoose.

use of dotenv for environment variables

use of Mongoose as modelling tool for dealing with the database

use of Express Routing with a controller and a model for scalability

use of async/await with a try/catch structure to handle promises

use of axios to handle API requests

# How to run the application

-> Make sure MongoDB and Nodejs are installed and running in your system

### Required Environment Variables:

MONGO_URL :Url to connect with MongoDB(mongodb+srv://team6:cognizant@cluster0.pg2w8.mongodb.net/test)

PORT : port to run the server (default Value: 8000)

### Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

In the project directory:

###  For Running both server and client concurrently
    cd server 
    npm run dev

Runs both client and server at a time.
Open [http://localhost:3000](http://localhost:3000) and view the application in your browser.

### To run the client application alone
    cd  ./client
    npm run start   
    
### To run the backend-server alone
    cd ./server
    npm run server   
    
### To run the tests
    cd ./client
    npm run test

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.





