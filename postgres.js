/* global require, process, module */
/**
 * User database module backed by PostGreSQL. Supports get/set operations.
 */

"use strict";

const pg = require("pg");
pg.defaults.ssl = true;

module.exports = (function () {

  function PostGres () {
    this.users = {};
    const self = this;

    pg.connect(process.env.DATABASE_URL, function (err, client) {
      if (err) throw err;

      self.client = client;

      client.query("CREATE TABLE IF NOT EXISTS users (" +
        "id SERIAL PRIMARY KEY, " +
        "google_id varchar(100) NOT NULL, " +
        "routeId varchar(100)" +
        "stopId text NOT NULL" +
      ")");

      client
        .query("SELECT * FROM users")
        .on("row", function (row) {
          self.users[row.google_id] = row;
        });
    });
    return this;
  }

  /**
   * Get a user from the database. If the user isn't found, create it.
   */
  PostGres.prototype.getUser = function (google_id) {
    const user = this.users[google_id];
    if (user) return user;

    // User didn't exist, create new
    this.saveUser({
      google_id: google_id,
    });
    return this.users[google_id];
  };

  /**
   * Updates a user in the database
   */
  PostGres.prototype.saveUser = function (data) {
    this.users[data.google_id] = data;
  };

  /****************************** Public Methods ******************************/

  /**
   * Set the user's selected route
   */
  PostGres.prototype.selectRoute = (google_id, routeId) => {
    const user = this.getUser(google_id);
    user.routeId = routeId;
    this.saveUser(user);
  };

  /**
   * Set the user's selected stop
   */
  PostGres.prototype.selectStop = (google_id, stopId) => {
    const user = this.getUser(google_id);
    user.stopId = stopId;
    this.saveUser(user);
  };

  /**
   * Get the user's selected route
   */
  PostGres.prototype.getRouteId = (google_id) => {
    return this.getUser(google_id).routeId;
  };

  /**
   * Get the user's selected stop
   */
  PostGres.prototype.getStopId = (google_id) => {
    return this.getUser(google_id).stopId;
  };

  /**
   * Page the user to the database.
   */
  PostGres.prototype.page = function (google_id) {
    const user = this.get_user(google_id);
    const self = this;

    if (user.id) {
      // Update
      self.client.query(
        "UPDATE users " +
        (user.routeId ? "SET routeId = '" + user.routeId + "' " : "") +
        "SET stopId = '" + user.stopId + "' " +
        "WHERE id = '" + user.id + "'"
      );

    } else {
      // New addition to db
      self.client.query(
        "INSERT INTO users (google_id, " + (user.routeId ? "routeId, " : "") + "stopId) " +
        "VALUES ('" + google_id + "', '" + (user.routeId ? user.routeId + "', '" : "") + user.stopId + "') " +
        "RETURNING id, google_id, routeId, stopId"
      ).on("row", (row) => {
        self.saveUser({
          id: row.id,
          google_id: row.google_id,
          routeId: row.routeId,
          stopId: row.stopId,
        });
      });
    }
  };

  return PostGres;

})();
