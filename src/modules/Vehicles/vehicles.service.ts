import { pool } from "../../config/db";

const getAllVehicles = async (req: Request, res: Response) => {};

const createVehicle = async (req: Request, res: Response) => {};
const getSingleVehicle = async (req: Request, res: Response) => {};
const updateVehicle = async (req: Request, res: Response) => {};
const deleteVehicle = async (req: Request, res: Response) => {};

export const vehicleServices = {
  getAllVehicles,
  createVehicle,
  getSingleVehicle,
  updateVehicle,
  deleteVehicle,
};
