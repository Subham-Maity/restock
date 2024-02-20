import { Router } from "express";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "../../../services/swagger/swagger";

const swagger: Router = Router();

swagger.use("/", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default swagger;
