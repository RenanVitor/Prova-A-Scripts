import AppDataSource from "../data-source";
import { Request, Response } from "express";
import { Uf } from "../entities/Uf";

class UfController {
    public async create(req: Request, res: Response): Promise<Response> {
        const { sigla, nome } = req.body;
        // verifica se foi fornecido o parâmetro
        if (!sigla || sigla.trim() === "") {
            return res.status(400).json({ error: "A sigla é necessária" });
        }
        if (!nome || nome.trim() === "") {
            return res.status(400).json({ error: "O nome é necessário" });
        }
        const obj = new Uf();
        obj.sigla = sigla;
        obj.nome = nome;

        try {
            const team = await AppDataSource.manager.save(Uf, obj);
            return res.json(team);
        } catch (e) {
            if (/UNIQUE.*sigla/.test(e.message)) {
                return res.status(400).json({ error: "A sigla já existe" });
            } else if (/UNIQUE.*nome/.test(e.message)) {
                return res.status(400).json({ error: "O nome já existe" });
            } else {
                return res.status(500).json({ error: "Ocorreu um erro no servidor" });
            }
        }
    }

    public async list(_: Request, res: Response): Promise<Response> {
        const ufs = await AppDataSource.getRepository(Uf).find({
            order: {
                sigla: "asc",
            },
        });
        return res.json(ufs);
    }
}

export default new UfController();