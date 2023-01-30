import type { Request, Response } from "express";
import prisma from "../../datasource";
import { success, failure } from "../../responses";

export const findAll = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const id = Number(req.params.id);
    const playlists = await prisma.playlist.findMany({
      where: { user_id: id },
      include: { user: true, songs: true },
    });

    return success({ res, data: playlists });
  } catch (error) {
    return failure({ res, message: error });
  }
};

export const store = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { name, user_id } = req.body;

    const playlist = await prisma.playlist.create({
      data: {
        name,
        user: { connect: { id: user_id } },
      },
    });

    return success({ res, status: 201, data: playlist });
  } catch (error) {
    return failure({ res, message: error });
  }
};

export const update = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const id = Number(req.params.id);

    const { song_id } = req.body;

    const playlist = await prisma.playlist.update({
      where: { id },
      include: {
        user: true,
        songs: true,
      },
      data: {
        songs: { connect: { id: song_id } },
      },
    });

    return success({ res, data: playlist });
  } catch (error) {
    return failure({ res, message: error });
  }
};

export const destroy = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const id = Number(req.params.id);

    await prisma.playlist.delete({ where: { id } });

    return success({ res, status: 201, data: "success delete" });
  } catch (error) {
    return failure({ res, message: error });
  }
};
