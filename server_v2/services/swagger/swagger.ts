import { Application, Request, Response } from "express";
import swaggerJsdoc from "swagger-jsdoc";
import * as swaggerUi from "swagger-ui-express";
import log from "../../utils/logger/logger";
import {
  authorName,
  contact,
  description,
  doc_api_location,
  license,
  title,
  url,
  version,
} from "./swagger.config";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: title,
      authorName: authorName,
      version: version,
      description: description,
      contact: contact,
      license: license,
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    servers: [
      {
        url: url,
      },
    ],
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: doc_api_location,
};

const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app: Application, port: number | string): void {
  // Swagger page
  app.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // Docs in JSON format
  app.get("/docs.json", (_req: Request, res: Response) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });
  log.info(`Docs available at http://localhost:${port}/api/v1/docs`);
}

export default swaggerDocs;
