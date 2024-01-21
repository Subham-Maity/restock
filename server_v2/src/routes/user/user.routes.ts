import * as express from "express";
import { Router } from "express";
import {
  fetchUserById,
  updateUser,
} from "../../controller/user/user.controller";
import { userUpdateValidationRules } from "../../validation/user/user.validation";

const user: Router = express.Router();

user
  .get("/:id", fetchUserById)
  .patch("/:id", userUpdateValidationRules, updateUser);

export default user;
