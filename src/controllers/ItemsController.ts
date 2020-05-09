import { Request, Response } from "express";
import { validate } from "class-validator";
import { getRepository } from "typeorm";
import { Items } from "../entity/Items";
import { Groups } from "../entity/Groups";

class ItemsController {
  static create = async (req: Request, res: Response) => {
    let { name, groups } = req.body;
    let items = new Items();
    items.name = name;

    const groupsRepository = getRepository(Groups);
    let groupsId = [];

    for (let i = 0; i < groups.length; i++) {
      const element = groups[i];
      const groupId = await groupsRepository.findOne({
        where: { name: element },
      });

      if (groupId) {
        groupsId.push(groupId);
      } else {
        return res.status(400).send();
      }
    }

    items.groups = groupsId;

    const errors = await validate(items);
    if (errors.length > 0) {
      res.status(400).send({ message: errors });
      return;
    }

    const itemsRepository = getRepository(Items);
    try {
      itemsRepository.create(items);
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
      const response = await itemsRepository.find({ relations: ["groups"] });
      res.status(200).send(response);
    } catch (e) {
      console.info(e);
      res.status(400).send();
      return;
    }
  };

  static update = async (req: Request, res: Response) => {
    let { name, groups } = req.body;
    let { id } = req.params;

    const itemsRepository = getRepository(Items);
    const groupsRepository = getRepository(Groups);

    const item = await itemsRepository.findOne({
      where: { id },
      relations: ["groups"],
    });

    if (item) {
      item.name = name;
    }

    let groupsItems = [];

    for (let i = 0; i < groups.length; i++) {
      const element = groups[i];
      const group = await groupsRepository.findOne({
        where: { name: element },
      });

      console.log(`${JSON.stringify(item)} *** 84`);
      if (group) {
        groupsItems.push(group);
      } else {
        return res.status(400).send();
      }
    }

    item.groups = groupsItems;

    const errors = await validate(item);
    if (errors.length > 0) {
      res.status(400).send({ message: errors });
      return;
    }

    try {
      await itemsRepository.save(item);
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
