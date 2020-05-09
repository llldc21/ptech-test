import { Request, Response } from "express";
import { validate } from "class-validator";
import { getRepository } from "typeorm";
import { Groups } from "../entity/Groups";

class GroupsController {
  static create = async (req: Request, res: Response) => {
    let { name } = req.body;
    let groups = new Groups();
    groups.name = name;

    const groupsRepository = getRepository(Groups);

    const errors = await validate(groups);
    if (errors.length > 0) {
      res.status(400).send({ message: errors });
      return;
    }

    try {
      groupsRepository.create(groups);
      await groupsRepository.save(groups);
    } catch (e) {
      console.info(e);
      res.status(409).send({ message: "Item already registered" });
      return;
    }

    res.status(201).send();
  };

  static list = async (req: Request, res: Response) => {
    const groupsRepository = getRepository(Groups);
    try {
      const response = await groupsRepository.find();
      res.status(200).send(response);
    } catch (e) {
      console.info(e);
      res.status(400).send();
      return;
    }
  };

  static update = async (req: Request, res: Response) => {
    let { name } = req.body;
    let { id } = req.params;

    const groups = new Groups();
    groups.name = name;

    const groupsRepository = getRepository(Groups);

    const errors = await validate(groups);
    if (errors.length > 0) {
      res.status(400).send({ message: errors });
      return;
    }

    try {
      await groupsRepository.update(id, groups);
      res.status(202).send();
    } catch (error) {
      res.status(400).send({ message: error });
    }
  };

  static delete = async (req: Request, res: Response) => {
    let { id } = req.params;

    const groupsRepository = getRepository(Groups);

    try {
      await groupsRepository.delete(id);
      res.status(202).send();
    } catch (error) {
      res.status(400).send({ message: error });
    }
  };
}

export default GroupsController;
