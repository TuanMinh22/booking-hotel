import express from "express"
import { verifyAdmin, verifyToken, verifyUser } from "../middleware/verifyToken.js";
import { createRoom, deleteRoom, getRoom, getRooms, updateRoom, getRoomTypes, getRoomByCity, getStar, getRoomByType, getRoomsBySearch, createRent, getR } from "../controllers/room.js";

const router = express.Router()

router.post("/createroom", createRoom);
router.put("/:id", updateRoom);
router.delete("/:id", deleteRoom);
router.get("/getRoomByS", getRoomsBySearch);
router.get("/getRoomTypes", getRoomTypes);
router.get("/", getRooms);
router.get("/:id", getRoom);
router.get("/getRoomByCity/:flag", getRoomByCity);
router.get("/getStar/:id", getStar);
router.get("/getRoomByType/:id", getRoomByType);
router.post("/createRent", createRent);
router.get("/getR/:id", getR);

export default router