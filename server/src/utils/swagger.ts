import {Application, Express, Request, Response} from "express";
import swaggerJsdoc from "swagger-jsdoc";
import * as swaggerUi from "swagger-ui-express";
import log from "./logger.js";


const options: swaggerJsdoc.Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "REST API Docs",
            version: "1.0.0",
            description: "REST API Docs",
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
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ["./src/routes.ts", "./src/schema/*.ts"],
};

const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app: Application, port: number | string): void {
    // Swagger page
    app.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    // Docs in JSON format
    app.get("/docs.json", (req: Request, res: Response) => {
        res.setHeader("Content-Type", "application/json");
        res.send(swaggerSpec);
    });
    log.info(`Docs available at http://localhost:${port}/api/v1/docs`);
}

export default swaggerDocs;