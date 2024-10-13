const mongoose = require('mongoose');
require('dotenv').config();  // Load environment variables from .env file

// Use the environment variable for MongoDB connection string
const mongoDBUrl = process.env.MONGODB_URL;

mongoose.connect(mongoDBUrl, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    console.log('Connected to DB');
})
.catch((err) => {
    console.log(err);
});

module.exports = mongoose;
