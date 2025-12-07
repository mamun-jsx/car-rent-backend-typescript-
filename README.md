## 📋 Project Summary

This is a robust backend application for a Car Rental System built using **Express.js**, **TypeScript**, and **PostgreSQL**. The system utilizes **NeonDB** for database management and implements secure authentication using **JWT (JSON Web Tokens)**.

The application supports role-based functionality:
* **Admins** can manage vehicles (CRUD), create other admins, and oversee bookings.
* **Users** can browse available vehicles and make bookings.

## ✨ Key Features

* **User Authentication:** Secure Signup and Signin using JWT.
* **Role-Based Access Control:** Distinct capabilities for Admins and Users.
* **Vehicle Management:** Admin capability to add, update, and remove vehicles.
* **Booking System:** Users can book vehicles; Admins can manage these bookings.
* **Scalable Architecture:** Built with TypeScript for type safety and maintainability.

## 🛠️ Tech Stack

* **Language:** TypeScript
* **Framework:** Express.js
* **Database:** PostgreSQL (NeonDB)
* **Authentication:** JSON Web Tokens (JWT)

## 🚀 Getting Started

Follow these steps to set up and run the project locally.

### 1. Clone the Repository

```bash
git clone this repo
cd <CAR-RENT-TS>
 backend : https://car-rent-ts-eight.vercel.app/ 
npm install

# Server Configuration
PORT=5000 or 3001

# Database Configuration (NeonDB)
connectionString=postgres://<user>:<password>@<host>/<dbname>?sslmode=require

# Security
jwt_secret_key=your_super_secret_jwt_key

npm run dev


src/
 ├── modules/
 │    ├── Auth/
 │    │     ├── auth.ts
 │    │     ├── auth.controller.ts
 │    │     ├── auth.service.ts
 │    ├── booking/
 │    │     ├── booking.ts
 │    │     ├── booking.controller.ts
 │    │     ├── booking.service.ts
 │    ├── vehicles/
 │    │     ├── vehicles.ts
 │    │     ├── vehicles.controller.ts
 │    │     ├── vehicles.service.ts
 │    ├── users/
 │          ├── user.ts
 │          ├── user.controller.ts
 │          ├── user.service.ts
 │
 ├── types/
 │     └── express.d.ts
 │
 ├── config/
 │     └── db.ts
 │
 ├── server.ts


