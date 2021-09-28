# Movie_Listing_Webapp

<h3>Features</h3>

- Login/SignUp

- Search movies via Keywords

- Add/Remove Favourites

It used The Movie DB open API for movie listing and searching.
## Get Started

- Fork the repository. With the repository forked, you’re ready to clone it so that you have a local       working copy of the code base.
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
Frontend will run in port 5000 due proxy url in package.json file.
