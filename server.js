/* global require, process, __dirname */

const path = require("path");
const express = require("express");
const UserDB = require("./postgres");

const users = new UserDB();
const app = express();
app.set("port", (process.env.PORT || 8000));
app.use(express.static("public"));

app.get("*", (req, res) => res.sendFile(path.resolve(__dirname, "public/index.html")));

app.listen(app.get("port"), () => console.log("Server running"));
