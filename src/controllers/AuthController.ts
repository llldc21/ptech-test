import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { validate } from "class-validator";
import * as dotenv from "dotenv";
import { getRepository } from "typeorm";
import { Users } from "../entity/User";

dotenv.config({ path: `${__dirname}/../../.env` });

class AuthController {
  static login = async (req: Request, res: Response) => {
    let { email, password } = req.body;
    if (!(email && password)) {
      res.status(400).send();
    }

    const userRepository = getRepository(Users);
    let user: Users;
    try {
      user = await userRepository.findOneOrFail({ where: { email } });
    } catch (error) {
      res.status(401).send();
    }

    if (!user.checkIfUnencryptedPasswordIsValid(password)) {
      res.status(401).send();
      return;
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.TOKEN,
      { expiresIn: "1h" }
    );

    res.send({ token: token });
  };

  static changePassword = async (req: Request, res: Response) => {
    const id = res.locals.jwtPayload.id;

    const { oldPassword, newPassword } = req.body;
    if (!(oldPassword && newPassword)) {
      res.status(400).send();
    }

    const userRepository = getRepository(Users);
    let user: Users;
    try {
      user = await userRepository.findOneOrFail(id);
    } catch (id) {
      res.status(401).send();
    }

    if (!user.checkIfUnencryptedPasswordIsValid(oldPassword)) {
      res.status(401).send();
      return;
    }

    user.password = newPassword;
    const errors = await validate(user);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }
    user.hashPassword();

    userRepository.save(user);

    res.status(204).send();
  };
}
export default AuthController;
