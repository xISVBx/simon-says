"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
const BackendRoutes_routes_js_1 = __importDefault(require("./routes/BackendRoutes.routes.js"));
const cors_1 = __importDefault(require("cors"));
class Server {
    constructor() {
        //configuracion de la aplicación
        this.config = () => {
            this.backend.use((0, cors_1.default)());
            this.backend.set('port', 3000);
            this.backend.use((0, express_1.json)());
            this.backend.use((0, express_1.urlencoded)({ extended: true }));
        };
        this.route = () => {
            //las rurtas que se van a usar
            this.backend.use('/jugadores', this.backendRoute.router);
        };
        this.start = () => {
            this.backend.listen(this.backend.get('port'), () => {
                console.log('Server on port: ', this.backend.get('port'));
            });
        };
        this.backend = (0, express_1.default)();
        this.backendRoute = new BackendRoutes_routes_js_1.default();
        this.config();
        this.route();
    }
}
const server = new Server();
server.start();
