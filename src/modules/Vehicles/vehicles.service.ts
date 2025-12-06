import { pool } from "../../config/db";
// ? ============================== Get All Vehicles ==========================================================
const getAllVehicles = async () => {
    const result  = await pool.query(`SELECT * FROM vehicles`);
    return result
};

// ? ============================== Create Vehicle ==========================================================
const createVehicle = async (payload: Record<string, unknown>) => {
  const {
    vehicle_name,
    type,
    registration_number,
    daily_rent_price,
    availability_status,
  } = payload;
  const result = await pool.query(
    `
        INSERT INTO 
        vehicles(vehicle_name, type, registration_number, daily_rent_price, availability_status)
        VALUES ($1,$2,$3,$4,$5)
        RETURNING *  
        `,
    [
      vehicle_name,
      type,
      registration_number,
      daily_rent_price,
      availability_status,
    ]
  );
  return result.rows[0];
};
// ? ============================== Get Single Vehicle ==========================================================
const getSingleVehicle = async (req: Request, res: Response) => {};
// ? ============================== Update Vehicle ==========================================================
const updateVehicle = async (req: Request, res: Response) => {};
// ? ============================== Delete Vehicle ==========================================================
const deleteVehicle = async (req: Request, res: Response) => {};

export const vehicleServices = {
  getAllVehicles,
  createVehicle,
  getSingleVehicle,
  updateVehicle,
  deleteVehicle,
};
