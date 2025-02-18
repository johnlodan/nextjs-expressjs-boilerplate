# Next.js(ReactJs) Express.js Boilerplate

A boilerplate for fullstack web development using **"MongoDB ⦾ Express.js ⦾ Next.js ⦾ Node.js"**. It Includes **React.js, Redux, RTK Query, SASS, TailwindCSS, AntDesign**.

## Cloning

Make sure that [Node.js](https://nodejs.org/en/download) and [MongoDB](https://www.mongodb.com/try/download/community) are installed on the local machine.

```bash
git clone https://github.com/johnlodan/nextjs-expressjs-boilerplate.git
```
## ENV !!
For both **web** and **api** folder, Rename **.env.local** to **.env**

## Usage
1. To setup and run frontend (Next.js), open a new terminal.
```javascript
cd web       # Web Directory
npm install  # Install Packages
npm run dev  # To Run NextJs
```

2. Now, after the setup of the frontend, leave it running and open again a new terminal to setup and run the backend (Express.js, MongoDB).
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

4. [Login] Go to the browser http://localhost:3000
```javascript
email: admin@gmail.com  # Email
password: 123456        # Password
```

## Content
1. **Frontend(Next.js)** and **Backend(Express.js, MongoDB)** Integrations.
2. **Server Side Rendering(SSR)** and **Client Side Rendering(CSR)**.
3. **JWT (JSON WEB TOKEN)** to authenticate and transmit information to the protected routes.
4. **SASS (Syntactically Awesome Stylesheets)** that extends CSS with features that make styling web pages easier and more efficient.
5. **Ant Design (AntD)** to provide a set of high-quality components for web applications. It is widely used for its clean design, flexibility, and ease of use.
6. **Redux (State Management Library)** to store all the application data in a single location (Centralized State).
7. **RTK Query** for data fetching and caching tool built into Redux Toolkit. It simplifies API calls by handling caching, re-fetching, and state management automatically.
8. Fully **CRUD (Create, Read, Update, Delete)** functionality.
9. Support **Theming** (Light, Dark, Green ,Etc).

## POC
![](https://github.com/johnlodan/nextjs-expressjs-boilerplate/blob/main/docs/theme.gif)


## License

MIT