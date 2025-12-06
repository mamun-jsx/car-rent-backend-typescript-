//____This file is used to define all API endpoints____//

//* ================================== user API Endpoints ================================== //
 const USER_API = {
  CREATE_USER: "/api/v1/auth/signup", // POST
  GET_USERS: "/api/v1/users", // GET
  UPDATE_USER: "/api/v1/users/:userId", // PUT
  DELETE_USER: "/api/v1/users/:userId", // DELETE
};

//? ================================== vehicle API Endpoints ================================== //
const VEHICLE_API = {
  CREATE_VEHICLE: "/api/v1/vehicles", // POST
  GET_VEHICLES: "/api/v1/vehicles", // GET
  GET_SINGLE_VEHICLE: "/api/v1/vehicles/:vehicleId", // GET
  UPDATE_VEHICLE: "/api/v1/vehicles/:vehicleId", // PUT
  DELETE_VEHICLE: "/api/v1/vehicles/:vehicleId", // DELETE
};

