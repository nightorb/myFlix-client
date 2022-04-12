# myFlix-client [![Netlify Status](https://api.netlify.com/api/v1/badges/f90a8064-a676-4491-bafb-db5e223e23e5/deploy-status)](https://app.netlify.com/sites/nightorbs-myflix/deploys)

## Overview
"myFlix" is a single-page, responsive application with routing, rich interactions, several interface views, and a polished user experience. The app provides users with access to information about different movies, directors, genres, and actors. Users are able to sign up, update their personal information, and create a list of their favorite movies.

To learn more about its server-side component, click [here](https://github.com/nightorb/movie_api).<br>
There is also an [Angular version of myFlix](https://nightorb.github.io/myFlix-client-Angular/).

## Live Demo
To check out the live demo of this project, click [here](https://nightorbs-myflix.netlify.app/). If you don't want to create an account, you can login with the demo user:

- **Username:** demouser
- **Password:** Demo_1234

Please note that you shouldn't change the username or password when using the demo user.

<div align="center">
  <img src="https://user-images.githubusercontent.com/89855337/162857255-f3114277-babc-4884-bfd3-09bf05f8c525.png"
       alt="screenshot of myFlix app login view"
       width=45%>
  <img src="https://user-images.githubusercontent.com/89855337/162857261-2ee5c3c8-3849-4d07-81f0-a9311899b8ac.png"
       alt="screenshot of main view with movies list"
       width=45%>
  <img src="https://user-images.githubusercontent.com/89855337/162857257-65d897bb-1d6e-4b40-8967-4ec59e1385eb.png"
       alt="screenshot of movie details view"
       width=45%>
  <img src="https://user-images.githubusercontent.com/89855337/162857251-fb2d8978-137a-495d-a3f4-4c5293c50fdc.png"
       alt="screenshot of director details view"
       width=45%>
  <img src="https://user-images.githubusercontent.com/89855337/162857252-7134dd36-c610-4b86-9d8b-545b1475ed8f.png"
       alt="screenshot of genres list"
       width=45%>
  <img src="https://user-images.githubusercontent.com/89855337/162857899-9fb34bd5-b24c-46a0-980f-3856e9cbdbc8.png"
       alt="screenshot of user profile"
       width=45%>
</div>

## Built with
- React
- React-Bootstrap
- React Router
- React Redux
- Redux
- Axios
- PropTypes

## Key Features
- Allows new users to register, and existing users to login/logout
- Allows users to view details about movies, genres, directors, and actors
- Users are able to update or delete their profile
- Users are able to add/remove movies to their list of favorites

## Technical Features
- Single-page application (SPA)
- Uses state routing to navigate between views and share URLs
- Gives users the option to filter movies
- Initially uses Parcel as its build tool
- Written with React library and React Redux
- Uses React Bootstrap as a UI library for styling and responsiveness
- Contains a mix of class components and function components
