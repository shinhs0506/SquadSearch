# SquadSearch

Our app SquadSearch lets you find others who are interested in or attending the same events so that you can form a group of people to go with. Through different chat boards you are able to communicate with a wide range of audiences attending all sorts of events across the world. You will be able to chat with other users on the app through a variety of different chat options where you can get to know new people and set up a meeting.

## Project Task requirements
- 3-5 minimal
  - [x] Create events 
  - [x] Create/update profile
  - [x] View/search through events
- 3-7 standards
  - [x] Multiple channels
  - [x] Join events and different chat channels
  - [ ] Private messages
  - [x] Login/Authentication
- 2-3 stretch
  - [ ] Grouping algorithm
  - [ ] Video chatting
  - [x] Map with pins showing current event locations

## Tech used from modules 1-5
- Module 1
  - Styling done with css and Material UI
    - Matrial UI provides styling for frequently used components in React applications out-of-the-box. This allows rapid app development. We use Material UI to style most of our pages and forms
  - code examples [here](https://github.com/shinhs0506/SquadSearch/blob/main/frontend/src/components/eventCard/eventCard.css) and [here](https://github.com/shinhs0506/SquadSearch/blob/main/frontend/src/components/loginForm/SignInSide.jsx#L41)
- Module 2
  - Frontend app initiated with create-react-app
    - create-react-app allows a quick setup for React applications
  - Redux for event, profile, and chat data
    - Redux prevents React components from having large amount of application state. When paired with AsnycThunks, data from async API calls are seamlessly handled. We use Redux to store event, profile, and chat data
  - code examples [here](https://github.com/shinhs0506/SquadSearch/blob/main/frontend/src/redux/store.jsx) and [here](https://github.com/shinhs0506/SquadSearch/blob/main/frontend/src/redux/slices/authSlice.js)
- Module 3
  - Backend built in Node.JS and Express.JS
    - Express.JS allows simple interface for creating request endpoints and configuration. Node.JS, as a Javascript runtime environment, executes server-side code (execute DB queries and generate tokens)
  - [here](https://github.com/shinhs0506/SquadSearch/blob/main/backend/index.js) and [here](https://github.com/shinhs0506/SquadSearch/blob/main/backend/controllers/authController.js)
- Module 4
  - MongoDB deployed on MongoDB Atlas
    - MongoDB supports unstructured data which allows us to store image and chat data with ease. Mongoose allows easy integration with MongoDB as it translates objects in MongoDB to Javascript objects in code
  - code example [here](https://github.com/shinhs0506/SquadSearch/blob/main/backend/models/chat.js)
- Module 5
  - App deployed on Heroku
    - As part of Continous Development, we have lint check set up on every pull requests in order to keep our production code clean. In addition, automatic deployment is set up on push to the main branch
  - code example [here](https://github.com/shinhs0506/SquadSearch/blob/main/.github/workflows/deploy.yaml) and [here](https://github.com/shinhs0506/SquadSearch/blob/main/.github/workflows/deploy.yaml)

## Above and Beyond Functionalities
- Google Maps
  - We display a map with makers to show the physical location of events. Location string is queried against Google Maps API and we retreive the geo-location information of the first result to display on the map


## What's Next
- Documentation
  - To further develop the project, good code documentation would help developers to easily extend the functionality of the current system and possibly attract open-source contributions
- User Experience
  - We can gather feedbacks from first-time users to improve on the user experience.
- Authentication
  - Make the authentication system more robust by pairing the auth tokens with refresh tokens for better user experience
  Testing
  - End-to-end testing with Selenium would make our project more robust


## Contributions
- John
   - Login / Auth: Implemented token-based authentication system
   - Google Maps: Display a map to show physical location of events using Google Maps API
   - Redux / API: Built redux and backend APIs for Event and User Profile data 
