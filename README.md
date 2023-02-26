<h1 align="center">Welcome to what-todo 👋</h1>

> A social media app with todo lists.<br />

## Steps to run the application

0. Clone the repository and navigate to the cloned folder
1. Install node_modules
```sh
npm i
```

2. Add a .env file to root directory and give appropriate values:
```sh
MONGO_URI=
PORT=
JWT_SECRET=
REFRESH_TOKEN_SECRET=
```

3. We are now all set to start our application, run the followind command:
```sh
npm start
```

## ✨ Objective
<p align="center">USER - Signup & Login</p>
<p align="center">TODO - Create, Manage their TODOs & view others' todos</p>
<p align="center">POSTS - Create & Manage their POSTs & comment on others' posts</p>

## 🚀 Highlights
<p align="center">LISTING APIs have pagination & querying support</p>
<p align="center">RBAC implemented: For 'admin' & 'member' roles</p>
<p align="center">RATE-LIMITING implemented to Limit comment spamming and too many accounts & posts creation</p>
<p align="center">REFRESH TOKEN implemented</p>

## 🤝 Areas of Improvement (TODO items)
<p align="center">Application level logging can be improved</p>
<p align="center">Read heavy endpoints(like listing APIs) can be cached</p>
<p align="center">APIdocs can be added at the route layer</p>
<p align="center">Projections can be implemented, so that we do not GET the entire document everytime, just the fields we require can be retrieved</p>
<p align="center">APIdocs can be added at the route layer</p>
<p align="center">OAuth2.0 can be added at the auth layer</p>

## Show your support

Please ⭐️ this repository if you liked this project!
