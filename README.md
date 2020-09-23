# Gymnasium - (As of now project is in progress)

This project is built using MEAN stack.
Frontend :- Angular 9
Backend :- Node , Express JS
Database :- Mongo DB

# Start the app
1. git clone https://github.com/nadim-khan/Gymnasium.git
2. npm install
3. create DB and configure it in .env file and 
4. run the command - " npm run startbuiltApp "

## Build for general coding purpose.

# Description of this project

## Frontend : 
Consist of 3 modules,
1. Home 
2. Users
3. Trainers

User types :
1. Admin
-- Has access to every functionality
-- Can broadcast a message
-- Add, delete, edit the fee structure
-- Add , delete, edit the User and Trainer details
-- change everything

2. General User
can only view the info
no access to edit, create or delete anything

## Backend : 
Has following types of API
1. login, register (auth/login, auth/register)
2. Broadcast (broadcast)
3. Fee structure (feeStructure)

for further details 

# Contact me : 7024019995 or drop a mail at khan.nadim5811@gmail.com

# Scripts
 
 to start , Run :- " npm run startbuiltApp "
 
 or you can use any of the commands accordingly.
 
 "scripts": {
        "ng": "ng",
        "serve": "ng serve",
        "start": "ng serve",
        "startBackend": "nodemon server/index.js",
        "startbuiltApp": "concurrently \"npm run prodbuild \" \"npm run startBackend\" \"npm run start \"",
        "build": "ng build",
        "prodbuild": "npm run build -- --prod",
        "test": "ng test",
        "lint": "ng lint",
        "e2e": "ng e2e",
        "debug": "node --nolazy --inspect-brk=9229 server/index.js"
    },


