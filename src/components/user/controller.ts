import type { Request, Response } from "express";
import prisma from "../../datasource";
import { success, failure } from "../../responses";
import { hashPassword, comparePassword } from "../../utils/strings";

export const store = async (req: Request, res: Response): Promise<Response> => {
  try {
    const data = req.body;
    data.password = hashPassword(data.password);
    data.last_session = new Date(data.last_session);
    data.date_born = new Date(data.date_born);

    const user = await prisma.user.create({ data });

    return success({ res, status: 201, data: user });
  } catch (error) {
    return failure({ res, message: error });
  }
};

export const login = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findFirst({ where: { email } });

    if (!comparePassword(user?.password as string, password)) {
      return failure({ res, message: "user wrong" });
    }

    return success({ res, data: user });
  } catch (error) {
    return failure({ res, message: error });
  }
};
