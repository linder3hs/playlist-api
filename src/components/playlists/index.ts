import { Router } from "express";
import * as Controller from "./controller";

const playlistRouter: Router = Router();

playlistRouter.get("/:id", Controller.findAll);
playlistRouter.post("/", Controller.store);
playlistRouter.put("/:id", Controller.update);

export default playlistRouter;
