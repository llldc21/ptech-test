import { Request, Response } from "express";
import { validate } from "class-validator";
import { getRepository } from "typeorm";
import { Items } from "../entity/Items";

class ItemsController {
  static create = async (req: Request, res: Response) => {
    let { name } = req.body;
    let items = new Items();
    items.name = name;

    const errors = await validate(items);
    if (errors.length > 0) {
      res.status(400).send({ message: errors });
      return;
    }

    const itemsRepository = getRepository(Items);
    try {
      await itemsRepository.save(items);
    } catch (e) {
      console.info(e);
      res.status(409).send({ message: "Item already registered" });
      return;
    }

    res.status(201).send();
  };

  static list = async (req: Request, res: Response) => {
    const itemsRepository = getRepository(Items);
    try {
      const response = await itemsRepository.find();
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

    let items = new Items();
    items.name = name;

    const errors = await validate(items);
    if (errors.length > 0) {
      res.status(400).send({ message: errors });
      return;
    }

    const itemsRepository = getRepository(Items);

    try {
      await itemsRepository.update(id, items);
      res.status(202).send();
    } catch (error) {
      res.status(400).send({ message: error });
    }
  };

  static delete = async (req: Request, res: Response) => {
    let { id } = req.params;

    const itemsRepository = getRepository(Items);

    try {
      await itemsRepository.delete(id);
      res.status(202).send();
    } catch (error) {
      res.status(400).send({ message: error });
    }
  };
}

export default ItemsController;
