<div align="center">

# Movie_Listing_Webapp
[![GitHub issues](https://img.shields.io/github/issues/Swarnim01/Movie_Listing_Webapp?style=for-the-badge)](https://github.com/Swarnim01/Movie_Listing_Webapp/issues)
[![GitHub forks](https://img.shields.io/github/forks/Swarnim01/Movie_Listing_Webapp?style=for-the-badge)](https://github.com/Swarnim01/Movie_Listing_Webapp/network)
[![GitHub stars](https://img.shields.io/github/stars/Swarnim01/Movie_Listing_Webapp?style=for-the-badge)](https://github.com/Swarnim01/Movie_Listing_Webapp/stargazers)
</div>

## Features

- LogIn, SignUp and LogOut 
    - google authorization is also available while signIn
  <br>
- Search movies via Keywords

- Get the following details for a specific movie:

  - Runtime
  - Release Date
  - Votes
  - Genres
  - Description
  - Cast
  - Languages Spoken
  - Production Companies

- Add/Remove Favourites

It uses The Movie DB API for movie listing, searching, and to fetch details for the selected movie.

## Get Started

- Fork the repository. With the repository forked, you’re ready to clone it so that you have a local working copy of the code base.
- Clone the Repository.

#### Server Setup...

Here , the root folder is the server folder and the client folder contains the frontend part of this webapp.
So to run the server :

- You will need a .env file in the root folder for the system to run successfully. An example for the .env file has been written in .env.example. Modify the environment variables as you need and required before starting. Set NODE_ENV to `development` while running it in development mode.
- Then in the root directory , to run the server :

```shell
npm install
```

```shell
npm start
```

Server should start running!.

#### Frontend Setup...

- Change the directory to client **(cd client)** and run:

```shell
npm install
```

```shell
npm start
```

server will run in port 5000 and frontend will request to 5000 port itself due proxy url in package.json file.

### Screenshots :

#### Login/Signup Screen

![Login/SignUp](https://user-images.githubusercontent.com/84467090/138818184-91803003-6a5b-4c0d-9fb0-2434a6003513.jpeg "Authentication Screens")

#### Home Screen

![Search](https://user-images.githubusercontent.com/84467090/138818648-4de5bc4c-1fe4-430a-95f7-daeee88516ed.jpeg "Home Screen with Search and Logout feature")

#### Movie Screen

![Movie](https://user-images.githubusercontent.com/84467090/138818783-601402db-8dae-4b60-9c23-5af5443bc964.jpeg "Movie Screen with details and 'Favourite' feature")

#### Favourites Screen

![Favourites](https://user-images.githubusercontent.com/84467090/138818716-e87f1f5c-abc7-4288-b26d-2e052516c3a3.jpeg "Favourites Screen with 'Remove Favourite' feature")
