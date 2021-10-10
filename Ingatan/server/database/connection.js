const mongoose = require('mongoose')

const connectDB = () => {
    mongoose.connect(process.env.DATABASE_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
    const connection = mongoose.connection;
    connection.once('open', () => {
        console.log('Connect to database successfull');
    });
};

module.exports = connectDB;