# Web Api Boilerplate

A boilerplate for fullstack web development using "MongoDB ⦾ Express.js ⦾ Next.js ⦾ Node.js". It Includes React.js, Redux, RTK Query, SASS, TailwindCSS, AntDesign.

## Cloning

Make sure that [Node.js](https://nodejs.org/en/download) and [MongoDB](https://www.mongodb.com/try/download/community) are installed on the local machine.

bash
git clone https://github.com/johnlodan/webapi-boilerplate.git


## Usage
1. To setup and run frontend (Next.js), open a new terminal.
```javascript
cd web       # Web Directory
npm install  # Install Packages
npm run dev  # To Run NextJs
```

2. Now, after the setup of the frontend, leave it running and open again a new terminal to run and setup the backend (Express.js, MongoDB).
```javascript
cd api       # Api Directory
npm install  # Install Packages
npm start    # To Run ExpressJS
```

3. [Generate Fake Data] Both frontend and backend are now running. Open again a new terminal and run this (once). [terminate this terminal once done], and let the frontend and backend running.
```javascript
cd api           # Api Directory
npm run faker    # RUN ONCE, This will generate fake data to the database.
```

4. [Login] Go to the browser http://localhost:3001
```javascript
email: admin@gmail.com  # Email
password: 123456        # Password
```
## POC
![](https://github.com/johnlodan/webapi-boilerplate/blob/main/docs/theme.gif)


## License

[MIT](https://choosealicense.com/licenses/mit/)