const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

// connectToMongo();
const app = express()
app.use(cors())
app.use(express.json())

const port = process.env.PORT || 5000;
const uri = process.env.MONGO_URI;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once("open", () => {
    console.log("MongoDB Connected");
});

// Available Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/task', require('./routes/task'))


app.listen(port, () => {
    console.log(`TMS backend listening at ${port}`)
});