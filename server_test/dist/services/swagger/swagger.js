"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerSpec = void 0;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const logger_1 = __importDefault(require("../../utils/logger/logger"));
const swagger_config_1 = require("./swagger.config");
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: swagger_config_1.title,
            authorName: swagger_config_1.authorName,
            version: swagger_config_1.version,
            description: swagger_config_1.description,
            contact: swagger_config_1.contact,
            license: swagger_config_1.license,
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
                url: swagger_config_1.url,
            },
        ],
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: swagger_config_1.doc_api_location,
};
exports.swaggerSpec = (0, swagger_jsdoc_1.default)(options);
function swaggerDocs(app, port) {
    // Docs in JSON format
    app.get("/docs.json", (_req, res) => {
        res.setHeader("Content-Type", "application/json");
        res.send(exports.swaggerSpec);
    });
    logger_1.default.info(`Docs available at http://localhost:${port}/api/v1/docs`);
}
exports.default = swaggerDocs;
