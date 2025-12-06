import { Request, Response } from "express";

const createUser = async (req: Request, res: Response) => {};
const getUser = async (req: Request, res: Response) => {};
const getSingleUser = async (req: Request, res: Response) => {};
const updateUser = async (req: Request, res: Response) => {};
const deleteUser = async (req: Request, res: Response) => {};

export const userControllers = {
  createUser,
  getUser,
  getSingleUser,
  updateUser,
  deleteUser,
};
