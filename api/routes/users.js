import express from "express"
import { updateUser, deleteUser, getUser, getUsers } from "../controllers/user.js";
import { verifyAdmin, verifyToken, verifyUser } from "../middleware/verifyToken.js";

const router = express.Router()

router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.get("/:id", getUser);
router.get("/", getUsers);

export default router