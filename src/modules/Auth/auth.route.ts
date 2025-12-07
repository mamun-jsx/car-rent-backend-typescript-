import express from "express";

const router = express.Router();

router.post("/api/v1/auth/signup");
router.post("/api/v1/auth/signin");
export const authRoute = router;
