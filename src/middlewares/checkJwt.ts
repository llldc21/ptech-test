import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config({ path: `${__dirname}/../../.env` });

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  let jwtPayload;

  try {
    jwtPayload = <any>jwt.verify(token, process.env.TOKEN);
    res.locals.jwtPayload = jwtPayload;
  } catch (error) {
    res.status(401).send();
    return;
  }
  const { id, username } = jwtPayload;
  const newToken = jwt.sign({ id, username }, process.env.TOKEN, {
    expiresIn: "1h",
  });
  res.setHeader("token", newToken);

  next();
};
