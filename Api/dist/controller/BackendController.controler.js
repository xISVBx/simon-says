"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BackendModel_model_js_1 = __importDefault(require("../model/BackendModel.model.js"));
class BackendController {
    constructor() {
        this.index = (req, res) => {
            res.json({ 'error': 1, 'msg': 'Api: homeDirectory' });
        };
        this.insertPlayer = (req, res) => {
            this.model.insertPlayer(req.body);
            return res.json({ 'success': 1, 'insertado': req.body });
        };
        this.getAllPlayers = (req, res) => {
            this.model.getAllPlayers();
            res.json(this.model.getAllPlayers());
        };
        this.getPlayers = (req, res) => {
            try {
                const { level } = req.params;
                console.log(level);
                if (level == '0') {
                    res.json(this.model.getPlayersEasy());
                }
                else if (level == '1') {
                    res.json(this.model.getPlayersMedium());
                }
                else if (level == '2') {
                    res.json(this.model.getPlayersDifficult());
                }
                else {
                    res.json({ "error": "valor no valido" });
                }
            }
            catch (error) {
                res.json({ "error": error });
            }
        };
        this.model = new BackendModel_model_js_1.default();
    }
}
exports.default = BackendController;
