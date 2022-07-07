const express = require('express');
const {connect} = require('mongoose');
const UserRoute = require('./routes/UserRoute');
const TodoRoute = require('./routes/TodoRoute');

require('dotenv').config();

const app = express();
app.use(express.json());
app.use(require("cors")());

app.use('/api/users', UserRoute);
app.use('/api/todos', TodoRoute);

connect(process.env.MONGO);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});