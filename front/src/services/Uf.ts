import api from "./api";
import { UfProps } from "../types";

const ufService = {
    async list(): Promise<UfProps[]> {
        const response = await api.get("/uf");
        return response.data;
    },

    async create(uf: UfProps): Promise<UfProps> {
        try {
            const response = await api.post("/uf", uf);
            return response.data;
        } catch (error: any) {
            if (error.response?.data?.error) {
                throw new Error(error.response.data.error);
            } else {
                throw new Error("Ocorreu um erro desconhecido");
            }
        }
    },
};

export default ufService;