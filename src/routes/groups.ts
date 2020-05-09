import { Router } from "express";
import GroupsController from "../controllers/GroupsController";
import { checkJwt } from "../middlewares/checkJwt";

const routes = Router();

routes.post("/create", [checkJwt], GroupsController.create);
routes.get("/list", [checkJwt], GroupsController.list);
routes.put("/update/:id", [checkJwt], GroupsController.update);
routes.delete("/delete/:id", [checkJwt], GroupsController.delete);

export default routes;
