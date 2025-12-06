import { pool } from "../../config/db";
// ? ============================== Get All Vehicles ==========================================================
const getAllVehicles = async () => {
  const result = await pool.query(`SELECT * FROM vehicles`);
  return result;
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
const getSingleVehicle = async (vehicleId: string | number) => {
  const result = await pool.query(`SELECT * FROM vehicles WHERE id=$1`, [
    vehicleId,
  ]);
  return result;
};
// ? ============================== Update Vehicle ==========================================================
const updateVehicle = async (payload:Record<string, unknown>, id:string | number) => {
    const { vehicle_name, type, registration_number, daily_rent_price, availability_status } = payload;
    const result =  await pool.query(
        `UPDATE vehicles SET vehicle_name=$1, type=$2, registration_number=$3, daily_rent_price=$4, availability_status=$5, updated_at=NOW() WHERE id=$6 RETURNING *`,
        [vehicle_name, type, registration_number, daily_rent_price, availability_status, id]
    );
    return result;
};

// ? ============================== Delete Vehicle ==========================================================
const deleteVehicle = async (req: Request, res: Response) => {};

export const vehicleServices = {
  getAllVehicles,
  createVehicle,
  getSingleVehicle,
  updateVehicle,
  deleteVehicle,
};
