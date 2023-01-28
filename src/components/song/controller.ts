import type { Request, Response } from "express";
import prisma from "../../datasource";
import { success, failure } from "../../responses";

export const findAll = async (
  _req: Request,
  res: Response
): Promise<Response> => {
  try {
    const songs = await prisma.song.findMany({ where: { is_public: true } });

    return success({ res, data: songs });
  } catch (error) {
    return failure({ res, message: error });
  }
};

export const store = async (req: Request, res: Response): Promise<Response> => {
  try {
    const data = req.body;

    const song = await prisma.song.create({ data });

    return success({ res, status: 201, data: song });
  } catch (error) {
    return failure({ res, message: error });
  }
};

export const findOne = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const id = Number(req.params.id);

    const song = await prisma.song.findUnique({ where: { id } });

    return success({ res, data: song ?? "song not found" });
  } catch (error) {
    return failure({ res, message: error });
  }
};
