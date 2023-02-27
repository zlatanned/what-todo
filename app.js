const express = require('express');
require('dotenv').config(); // for loading environment variables
const mongoose = require('mongoose');
const users = require('./routes/users.rest');
const posts = require('./routes/posts.rest');
const authRoutes = require('./routes/auth.rest');
const commentsRoute = require('./routes/comments.rest');
const todoRoutes = require('./routes/todos.rest');
const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

/**
 * @author Akshay Shahi
 */

// use middleware to parse requests containing json payloads
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//DB connection
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Mongo Connection successful'))
  .catch((err) => console.error('err', err));

mongoose.Promise = global.Promise;

// Use middleware to set up routes
app.use('/api/posts/', posts);
app.use('/api', authRoutes);
app.use('/api/comments', commentsRoute);
app.use('/api/todo', todoRoutes);
app.use('/', (req,res)=> {res.send(`Welcome to what-todo Social media app`)})

// start listening & inform user
app.listen(PORT, () => {
  console.log(`Server up and running on port ${PORT}`);
});
