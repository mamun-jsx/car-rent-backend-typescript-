import { pool } from "../../config/db";
// ? ============================== Get All Vehicles ==========================================================
const getAllVehicles = async () => {
    const result = await pool.query(`SELECT * FROM vehicles`);
    return result;
};
// ? ============================== Create Vehicle ==========================================================
const createVehicle = async (payload) => {
    const { vehicle_name, type, registration_number, daily_rent_price, availability_status = "available", } = payload;
    const result = await pool.query(`
        INSERT INTO 
        vehicles(vehicle_name, type, registration_number, daily_rent_price, availability_status)
        VALUES ($1,$2,$3,$4,$5)
        RETURNING *  
        `, [
        vehicle_name,
        type,
        registration_number,
        daily_rent_price,
        availability_status,
    ]);
    return result.rows[0];
};
// ? ============================== Get Single Vehicle ==========================================================
const getSingleVehicle = async (vehicleId) => {
    const result = await pool.query(`SELECT * FROM vehicles WHERE id=$1`, [
        vehicleId,
    ]);
    if (result.rowCount === 0) {
        throw new Error(`Vehicle not found with id: ${vehicleId}`);
    }
    return result;
};
// ? ============================== Update Vehicle ==========================================================
const updateVehicle = async (payload, id) => {
    // First check if vehicle exists
    const vehicleCheck = await pool.query(`SELECT * FROM vehicles WHERE id=$1`, [
        id,
    ]);
    if (vehicleCheck.rowCount === 0) {
        throw new Error(`Vehicle not found with id: ${id}`);
    }
    // Build dynamic update query based on provided fields
    const fields = [];
    const values = [];
    let paramIndex = 1;
    const allowedFields = [
        "vehicle_name",
        "type",
        "registration_number",
        "daily_rent_price",
        "availability_status",
    ];
    for (const [key, value] of Object.entries(payload)) {
        if (allowedFields.includes(key) && value !== undefined && value !== null) {
            fields.push(`${key} = $${paramIndex}`);
            values.push(value);
            paramIndex++;
        }
    }
    if (fields.length === 0) {
        throw new Error("No valid fields to update");
    }
    values.push(id);
    const query = `UPDATE vehicles SET ${fields.join(", ")}, updated_at=NOW() WHERE id=$${paramIndex} RETURNING *`;
    const result = await pool.query(query, values);
    return result;
};
// ? ============================== Delete Vehicle ==========================================================
const deleteVehicle = async (id) => {
    // Check for active bookings
    const bookingCheck = await pool.query(`SELECT * FROM bookings WHERE vehicle_id=$1 AND status='active'`, [id]);
    if (bookingCheck.rows.length > 0) {
        throw new Error("Cannot delete vehicle with active bookings");
    }
    const result = await pool.query(`DELETE FROM vehicles WHERE id=$1 RETURNING *`, [id]);
    return result;
};
export const vehicleServices = {
    getAllVehicles,
    createVehicle,
    getSingleVehicle,
    updateVehicle,
    deleteVehicle,
};
