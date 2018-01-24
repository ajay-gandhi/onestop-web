/* global require, process, __dirname */

const path = require("path");
const express = require("express");
const UserDB = require("./postgres");

const users = new UserDB();
const app = express();
app.set("port", (process.env.PORT || 8000));
app.use(express.static("public"));

app.get("/saveSettings", (req, res) => {
  users.selectAgency(req.query.google_id, req.query.agencyId);
  users.selectRoute(req.query.google_id, req.query.routeId);
  users.selectStop(req.query.google_id, req.query.stopId);
  users.page(req.query.google_id);
  res.end({ success: true });
});

app.get("/getSettings", (req, res) => {
  const response = {
    success: true,
    agencyId: users.getAgencyId(req.query.google_id),
    routeId: users.getRouteId(req.query.google_id),
    stopId: users.getStopId(req.query.google_id),
  };
  res.end(response);
});

app.get("*", (req, res) => res.sendFile(path.resolve(__dirname, "public/index.html")));

app.listen(app.get("port"), () => console.log("Server running"));
