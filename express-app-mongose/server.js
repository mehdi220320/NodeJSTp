const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const userRoutes=require('./routes/user.routes')
const app = express();

mongoose.connect(process.env.Mongo_URL)
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("MongoDB connection error:", err));

app.use(express.json());
app.use('/users',userRoutes)
app.listen(process.env.PORT, () => {
    console.log("Listening on port " + process.env.PORT);
});
