import "reflect-metadata";
import { createConnection, Connection } from "typeorm";
import { Users, Items } from "../entity";

export default async (): Promise<Connection> => {
  return createConnection({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "test",
    password: "test",
    database: "postgres",
    entities: [Users, Items],
    synchronize: true,
    logging: false,
  });
};
