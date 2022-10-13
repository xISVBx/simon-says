"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const BackendController_controler_js_1 = __importDefault(require("../controller/BackendController.controler.js"));
class BackendRoute {
    constructor() {
        this.config = () => {
            //rutas
            this.router.get('/');
            this.router.post('/jugadores', this.backendController.insertPlayer);
            this.router.get('/jugadores', this.backendController.getAllPlayers);
            this.router.get('/jugadores/:level', this.backendController.getPlayers);
        };
        this.router = (0, express_1.Router)();
        this.backendController = new BackendController_controler_js_1.default();
        this.config();
    }
}
exports.default = BackendRoute;
