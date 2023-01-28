import { Router } from "express";
import * as Controller from "./controller";

const songRouter = Router();

songRouter.get("/", Controller.findAll);
songRouter.post("/", Controller.store);
songRouter.get("/:id", Controller.findOne);

export default songRouter;
 
