import * as express from "express";
import { Router } from "express";
import {fetchUserById, updateUser} from "../../controller/user/user.controller";


const user: Router = express.Router();

user.get("/users/:id", fetchUserById).patch("/users/:id", updateUser);

export default user;
