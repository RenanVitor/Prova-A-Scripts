import { Router, Request, Response } from "express";
import uf from './uf';

const routes = Router();

routes.use("/uf", uf);

//aceita qualquer método HTTP ou URL
routes.use((_: Request, res: Response) => res.json({ error: "Requisição desconhecida" }));

export default routes;
