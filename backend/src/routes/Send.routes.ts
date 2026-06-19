import { Router } from "express";
import { SendController } from "../controllers/SendController";

const router = Router();
const controller = new SendController();

router.post("/send", controller.send);
router.get("/messages", controller.list);

export default router;