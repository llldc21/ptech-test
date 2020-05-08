import { Router } from "express";
import ItemsController from "../controllers/ItemsController";
import { checkJwt } from "../middlewares/checkJwt";

const routes = Router();

routes.post("/create", [checkJwt], ItemsController.create);
routes.get("/list", [checkJwt], ItemsController.list);
routes.put("/update/:id", [checkJwt], ItemsController.update);
routes.delete("/delete/:id", [checkJwt], ItemsController.delete);

export default routes;
