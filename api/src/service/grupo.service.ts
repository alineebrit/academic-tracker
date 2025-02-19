import { GrupoRepository } from "../repositories/grupo.repository";
import { Grupo } from "../models/grupo";

export class GrupoService {
    private grupoRepository = new GrupoRepository();

    async createGrupo(grupo: Grupo) {
        return await this.grupoRepository.createGrupo(grupo);
    }

    async getAllGrupos() {
        return await this.grupoRepository.findAll();
    }

    async getGrupoById(id: number) {
        return await this.grupoRepository.findById(id);
    }

    async updateGrupo(id: number, grupo: Grupo) {
        return await this.grupoRepository.update(id, grupo);
    }

    async deleteGrupo(id: number) {
        return await this.grupoRepository.delete(id);
    }
}
