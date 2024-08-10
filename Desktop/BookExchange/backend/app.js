const exprs = require('express');
const app = exprs();
const prt = 5000;
const mangoose = require('mongoose');
const db = require("./keyfile").mongoUrl;
const cross = require("cors");

app.use(cross());

require('./models/model'); 
require("./models/post");

app.use(exprs.urlencoded()); 
app.use(require("./routes/auth"));
app.use(require("./routes/createPost"));

mangoose.connection.on("connected", () => {
    console.log("connected");
});

mangoose.connection.on("error", () => {
    console.log("error");
});

app.listen(prt, () => {
    console.log("Server up " + prt); 
});
