# Movie_Listing_Webapp

## Features

- LogIn, SignUp and LogOut

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

![Login/SignUp](https://user-images.githubusercontent.com/78133928/137311280-d0a7003f-b04e-4528-a5cd-02e2dac4c8d7.JPG "Authentication Screens")

#### Home Screen

![Search](https://user-images.githubusercontent.com/78133928/137313953-66f171c2-3638-470c-98a6-a113bd3aa173.JPG "Home Screen with Search and Logout feature")

#### Movie Screen

![Movie](https://user-images.githubusercontent.com/78133928/137314631-1b62a18b-4ab2-4f19-8c69-e92a49e4ee00.JPG "Movie Screen with details and 'Favourite' feature")

#### Favourites Screen

![Favourites](https://user-images.githubusercontent.com/78133928/137311493-5f92dd0c-4dff-43e8-a9aa-ad98bead750a.JPG "Favourites Screen with 'Remove Favourite' feature")
