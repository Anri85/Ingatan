const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./database/connection');
const error_response = require('./utilities/error_response');
const { app, server } = require('./core/core');

// read file .env
dotenv.config();

// use cross origin resource sharing
app.use(cors());

// connect to database
connectDB();

// get data from request.body
app.use(express.json({ limit: '30mb', extended: true }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));

// create routes
app.use('/api/', require('./routers/posts_routes'));
app.use('/api/users/', require('./routers/users_routes'));

// using middlewares
app.use(error_response);

// server listening to PORT
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server Running At Port: ${PORT}`)
});