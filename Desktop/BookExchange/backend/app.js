const exprs = require('express');
const app = exprs();
const prt = 5000; // Use prt (5000) for port
const mangoose = require('mongoose');
const db = require("./keyfile").mongoUrl;
const cross = require("cors");

// Use 'cross' for the CORS library
app.use(cross()); 
require('./models/model'); 
require("./models/post");

// Combine express middlewares to support both JSON and URL-encoded bodies
app.use(exprs.json());
app.use(exprs.urlencoded({ extended: true }));

// Set up routes
app.use(require("./routes/auth"));
app.use(require("./routes/createPost"));

// Connect to MongoDB
mangoose.connect(db);

// Connection events
mangoose.connection.on("connected", () => {
    console.log("connected");
});

mangoose.connection.on("error", () => {
    console.log("error");
});

// Start server
app.listen(prt, () => {
    console.log("Server is running on port " + prt);
});
