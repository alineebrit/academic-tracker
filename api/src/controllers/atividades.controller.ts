/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Atividade } from "./../models/user";
import { Request, Response } from "express";
import {
    createAtividade,
    deleteAtividade,
    getAllAtividade,
    getByIdAtividade,
    updateAtividade,
} from "../service/atividade.service";

export const create = async (req: Request, res: Response) => {
    console.log("cheguei aq");
    console.log("params", req.params);
    console.log("body", req.body);
    console.log("headers", req.headers);
    try {
        const atividadeData = req.body;
        console.log(req.body);
        const atividade = await createAtividade(atividadeData);

        res.status(201).json({ data: atividade });
    } catch (error) {
        res.status(500).json({
            error: "Não foi possível criar a atividade",
        });
    }
};

export const update = async (req: Request, res: Response) => {
    try {
        const atividadeId = parseInt(req.params.id, 10);
        const atividadeData: Atividade = req.body;
        const atividade = await updateAtividade(atividadeId, atividadeData);
        res.status(200).json({ data: atividade });
    } catch (error) {
        res.status(500).json({
            error: "Não foi possível criar a atividade",
        });
    }
};

export const getAll = async (req: Request, res: Response) => {
    try {
        const getAll = await getAllAtividade();

        res.status(200).json({ data: getAll });
    } catch (error) {
        res.status(500).json({
            error: "Error ao utilizar o getAllAtividades",
        });
    }
};

export const getById = async (req: Request, res: any) => {
    try {
        const atividadeId = parseInt(req.params.id, 10);
        const atividade = await getByIdAtividade(atividadeId);

        res.status(200).json({ data: atividade });
    } catch (err) {
        res.status(500).json({
            error: `Não foi possível encontrar a atividade de id ${req.params.id}`,
        });
    }
};

export const exclude = async (req: Request, res: any) => {
    try {
        const atividadeId = parseInt(req.params.id, 10);
        const atividade = await deleteAtividade(atividadeId);

        res.status(204).json({ data: atividade });
    } catch (err) {
        res.status(500).json({
            error: `Não foi possível encontrar a atividade de id ${req.params.id}`,
        });
    }
};
