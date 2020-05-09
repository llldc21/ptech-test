import "reflect-metadata";
import { createConnection, Connection } from "typeorm";
import { Users, Items, Groups } from "../entity/index";

export default async (): Promise<Connection> => {
  return createConnection({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "test",
    password: "test",
    database: "postgres",
    entities: [Items, Users, Groups],
    synchronize: true,
    logging: false,
  });
};
