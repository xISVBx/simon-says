"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class BackendModel {
    constructor() {
        this.insertPlayer = (player) => {
            console.log('entro');
            let data = fs_1.default.readFileSync(this.file, 'utf8');
            let peopleData = JSON.parse(data);
            peopleData.push(player);
            data = JSON.stringify(peopleData);
            fs_1.default.writeFile(this.file, data, (err) => {
                if (err)
                    throw err;
                return false;
            });
            return true;
        };
        this.file = path_1.default.join(__dirname, "../db/Players.json"); //defaultIfEmpty
    }
    getAllPlayers() {
        let data = fs_1.default.readFileSync(this.file, 'utf8');
        console.log(data);
        let jsonObject = JSON.parse(data);
        return jsonObject;
    }
    getPlayersEasy() {
        let data = fs_1.default.readFileSync(this.file, 'utf8');
        console.log(data);
        let jsonObject = JSON.parse(data);
        let result = jsonObject.filter((item) => {
            return item.dificultad == 1;
        });
        return result;
    }
    getPlayersMedium() {
        let data = fs_1.default.readFileSync(this.file, 'utf8');
        console.log(data);
        let jsonObject = JSON.parse(data);
        let result = jsonObject.filter((item) => {
            return item.dificultad == 2;
        });
        let resultsorted = this.sort(result);
        return resultsorted;
    }
    getPlayersDifficult() {
        let data = fs_1.default.readFileSync(this.file, 'utf8');
        console.log(data);
        let jsonObject = JSON.parse(data);
        let result = jsonObject.filter((item) => {
            return item.dificultad == 3;
        });
        return result;
    }
    sort(Jugador) {
        Jugador.sort((a, b) => (b.puntuacion - a.puntuacion));
        return Jugador;
    }
}
exports.default = BackendModel;
