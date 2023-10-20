"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const fastify_1 = __importDefault(require("fastify"));
const cors_1 = __importDefault(require("@fastify/cors"));
const jwt_1 = __importDefault(require("@fastify/jwt"));
const app = (0, fastify_1.default)();
app.register(cors_1.default, {
    origin: true,
});
app.register(jwt_1.default, {
    secret: 'jokenpo',
});
app.listen({
    port: Number(process.env.PORT) | 3334
}).then(() => {
    console.log(`HTTP server running on http://localhost:${Number(process.env.PORT) | 3334}`);
});
