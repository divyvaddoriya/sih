import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getSuggestedConnections, getPublicProfile, updateProfile,searchUser } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/suggestions", protectRoute, getSuggestedConnections);
router.get("/:username", protectRoute, getPublicProfile);
router.put("/profile", protectRoute, updateProfile);
router.get("/search",protectRoute,searchUser)
export default router;
