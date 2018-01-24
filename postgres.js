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
        "googleId varchar(100) NOT NULL, " +
        "agencyId varchar(100) " +
        "routeId varchar(100) " +
        "stopId text NOT NULL" +
      ")");

      client
        .query("SELECT * FROM users")
        .on("row", function (row) {
          self.users[row.googleId] = row;
        });
    });
    return this;
  }

  /**
   * Get a user from the database. If the user isn't found, create it.
   */
  PostGres.prototype.getUser = function (googleId) {
    const user = this.users[googleId];
    if (user) return user;

    // User didn't exist, create new
    this.saveUser({
      googleId: googleId,
    });
    return this.users[googleId];
  };

  /**
   * Updates a user in the database
   */
  PostGres.prototype.saveUser = function (data) {
    this.users[data.googleId] = data;
  };

  /****************************** Public Methods ******************************/

  /**
   * Set the user's selected agency
   */
  PostGres.prototype.selectAgency = (googleId, agencyId) => {
    const user = this.getUser(googleId);
    user.agencyId = agencyId;
    this.saveUser(user);
  };

  /**
   * Set the user's selected route
   */
  PostGres.prototype.selectRoute = (googleId, routeId) => {
    const user = this.getUser(googleId);
    user.routeId = routeId;
    this.saveUser(user);
  };

  /**
   * Set the user's selected stop
   */
  PostGres.prototype.selectStop = (googleId, stopId) => {
    const user = this.getUser(googleId);
    user.stopId = stopId;
    this.saveUser(user);
  };

  /**
   * Get the user's selected agency
   */
  PostGres.prototype.getAgencyId = googleId => this.getUser(googleId).agencyId;

  /**
   * Get the user's selected route
   */
  PostGres.prototype.getRouteId = googleId => this.getUser(googleId).routeId;

  /**
   * Get the user's selected stop
   */
  PostGres.prototype.getStopId = googleId => this.getUser(googleId).stopId;

  /**
   * Page the user to the database.
   */
  PostGres.prototype.page = function (googleId) {
    const user = this.getUser(googleId);
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
        "INSERT INTO users (googleId, " + (user.routeId ? "routeId, " : "") + "stopId) " +
        "VALUES ('" + googleId + "', '" + (user.routeId ? user.routeId + "', '" : "") + user.stopId + "') " +
        "RETURNING id, googleId, routeId, stopId"
      ).on("row", (row) => {
        self.saveUser({
          id: row.id,
          googleId: row.googleId,
          routeId: row.routeId,
          stopId: row.stopId,
        });
      });
    }
  };

  return PostGres;

})();
