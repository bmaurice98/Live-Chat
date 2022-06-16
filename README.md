# Building a real time chat application through the use of MERN stack

## What is MERN?

MERN is the combination of MongoDB, ExpressJS, ReactJS, and NodeJS

### ReactJS

- ReactJS is the frontend framework. Used for building the components of
  a page. Everything the User sees is made through ReactJS.

- Reusable component (effective in component that are shown in abundance on a page)

- Virtual DOM. UI is kept in memory or synced with the "real" DOM through the use
  of ReactDOM.

- Very fast

### NodeJS

- NodeJS is the backend portion of the stack responsible for communicating
  with the web Server

- Javascript runtime built on Chrome V8 engine

- Scalable web Server. Responsible for managing API and connecting frontend with backend

- Contains Node package manager.

- Useful in developing realtime applications

### ExpressJS

- ExpressJS is the portion of the backend responsible for communicating with NodeJS
  and as a web framework

- Powerful routing API

- Easy to use (Documentation is simple and newby friendly)

- High performance, very scalable

- Third party plugins (Active community)

### MongoDB

- MongoDB is the database management technology of the stack. Used in storing
  all of the applications data. (Messages, accounts, etc.)

- Cross platform, no SQL database

- Self sustaining DB

- Highly scalable

- Flexible schema

## How they work together

React sends requests to web framework to ExpressJS, express takes the info and sends it
to the web server, which is then sent from web sever to MongoDB, then travels back up the ladder

## API call key functions

GET - returns a value within the database
POST - creates a new value in the database
PUT - updates vales already in the database
DELETE - deleting info from database

## Directories

To begin, There will be 2 main directories.

- Backend

  - Used to handle all communication between the web framework and the database
  - Models
    - Holds the schemas necessary for a chat model, message model, and user model.
    - These models tell the database how the data should be stored and distributed.

- Frontend
  - Handling all UI compenents and communication between the web framework

## Notable Problems / Function I want to implement

### Backend

### Frontend

- Search Users should update user input. (No need to have a button to activate search)
- Search should focus on the users name or the username of the email. This way user search doesn't show every user based on a letter.
- User account manipulation (Change user password)
- When adding users to a new group, don't allow existing users to be shown in searches.
- Updating group chat function to run in sequence.
