import { Router, Request, Response } from "express";
import UfController from "../controllers/UfController";

const routes = Router();

routes.post('/', UfController.create);
routes.get('/', UfController.list);

routes.use((_: Request, res: Response) => res.json({ error: "Requisição desconhecida com o UF" }));

export default routes;