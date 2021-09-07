<h1 align="center">
<br>
Quiz App
</h1>

<p align="center">
Quiz App is an application that allows you to create custom quizzes, update and removal, you can choose the theme, images, besides, you can challenge your friends or be challenged, numerous possibilities, and you can create and answer the quiz you want.
</p>



<!-- <div align="center">
  <img src="./assets/web.jpg"alt="demo-web" height="425" width="700">
  <img src="./assets/mobile1.jpg" alt="demo-mobile" height="425">
  <img src="./assets/mobile2.jpg" alt="demo-mobile" height="425">
  <img src="./assets/mobile3.jpg" alt="demo-mobile" height="425">
</div> -->

<!-- <hr /> -->

## Features

This app features all the latest tools and practices in web development!

- :large_blue_circle: **ReactJs** —React. js/React is an open-source frontend framework that is based on JavaScript, developed by Facebook, and best known for its virtual DOM feature.
- :black_circle: **NextJs** —Next. js is an open-source development framework built on top of Node. js enabling React based web applications functionalities such as server-side rendering and generating static websites (nextjs.org).
- 💹 **Node Js** — Node. js is primarily used for non-blocking, event-driven servers, due to its single-threaded nature. It's used for traditional web sites and back-end API services, but was designed with real-time, push-based architectures in mind.
- :izakaya_lantern: **NestJS** — Nest (NestJS) is a framework for building efficient, scalable Node. js server-side applications, built with and fully supports TypeScript. 
- :blue_book: **Postgres** — A cross-platform and open-source relational database.
- :blue_book: **Typescript** —TypeScript is a strongly typed programming language which builds on JavaScript giving you better tooling at any scale.

## Getting started

1. Clone this repo using `git clone https://github.com/wellingtonn96/quiz-app-generator.git`
2. Move yourself to the appropriate directory: `cd quiz-app-generator/packages`

### Getting started with the backend server

1. Move yourself to the backend folder: `cd server`
2. Run `yarn install` to install denpendences
3. Rename the file`.env.example` to `.env` and adding the database Postgres credentials: </br>
  ```
  DATABASE_TYPE=
  DATABASE_HOST=
  DATABASE_PORT=
  DATABASE_NAME=
  DATABASE_USER=
  DATABASE_PWD=
  ```
4. Run `yarn typeorm migrations:run` to run the migrations
5. Run `yarn start:dev` to start the server 

### Getting started with the frontend app

1. Move yourself to the web folder: `cd web`
2. Run `yarn install` to install the dependencies
3. Run `yarn dev` to start the web application

## Project

You can see this project at [http://imersao-react-nextjs.wellingtonn96.vercel.app]

## License

This project is licensed under the MIT License - see the [LICENSE](https://opensource.org/licenses/MIT) page for details.