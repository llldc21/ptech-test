import "reflect-metadata";
import express from "express";
import * as bodyparser from "body-parser";

import auth from "./routes/auth";
import users from "./routes/user";
import items from "./routes/items";
import groups from "./routes/groups";

import createConnection from "./configs/database";
createConnection();

class App {
  public express: express.Application;

  public constructor() {
    this.express = express();
    this.middlewares();
    this.routes();
  }

  private middlewares() {
    this.express.use(express.json());
    this.express.use(bodyparser.urlencoded({ extended: true }));
  }

  private routes() {
    this.express.use("/auth", auth);
    this.express.use("/users", users);
    this.express.use("/items", items);
    this.express.use("/groups", groups);
  }
}

export default new App().express;
