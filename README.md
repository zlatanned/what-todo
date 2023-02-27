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

## Endpoints exposed

0. USER endpoints:
```sh
SIGNUP - POST /api/user/
LOGIN - POST /api/login/
```

1. TODO endpoints:
```sh
CREATE TODO - POST /api/todo/
GET ALL TODOS - GET /api/todo/  (SUPPORTS PAGINATION & QUERYING/FILTERING)
GET TODO BY ID - GET /api/todo/:id
UPDATE TODO BY ID - PATCH /api/todo/:id
DELETE TODO BY ID - DELETE /api/todo/:id
```

2. POST endpoints:
```sh
CREATE POST - POST /api/posts/
GET ALL POSTS - GET /api/posts/  (SUPPORTS PAGINATION & QUERYING/FILTERING)
GET POST BY ID - GET /api/posts/:id
UPDATE POST BY ID - PATCH /api/posts/:id
DELETE POST BY ID - DELETE /api/posts/:id
```

3. COMMENT endpoints:
```sh
ADD COMMENTS TO A POST BY POST ID- POST /api/comments/:post_id
GET COMMENTS BY POST ID- GET /api/comments/:post_id  (SUPPORTS PAGINATION & QUERYING/FILTERING)
```
## Show your support

Please ⭐️ this repository if you liked this project!
