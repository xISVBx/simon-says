//import players from "../db/Players.json"
import Iplayers from "../interface/player.interface.js"
import fs from "fs"
import path from "path"
import json from 'express';
import Jugador from '../interface/player.interface';

class BackendModel{
    private file:string
    constructor(){
        this.file = path.join(__dirname, "../db/Players.json")//defaultIfEmpty
    }
    public getAllPlayers(){
        let data = fs.readFileSync(this.file,'utf8');
        console.log(data)
        let jsonObject = JSON.parse(data)
        return jsonObject
    }
    public getPlayersEasy(){
        let data = fs.readFileSync(this.file,'utf8');
        console.log(data)
        let jsonObject = JSON.parse(data)
        let result = jsonObject.filter((item:Iplayers)=>{
            return item.dificultad == 1;
        })
        return result
    }
    public getPlayersMedium(){
        let data = fs.readFileSync(this.file,'utf8');
        console.log(data)
        let jsonObject = JSON.parse(data)
        let result = jsonObject.filter((item:Iplayers)=>{
            return item.dificultad == 2;
        })
        let resultsorted=this.sort(result)
        return resultsorted
    }
    public getPlayersDifficult(){
        let data = fs.readFileSync(this.file,'utf8');
        console.log(data)
        let jsonObject = JSON.parse(data)
        let result = jsonObject.filter((item:Iplayers)=>{
            return item.dificultad == 3;
        })
        return result
    }
    public insertPlayer = (player:Iplayers) =>{
        console.log('entro')
        let data = fs.readFileSync(this.file,'utf8');
        let peopleData: Iplayers[] = JSON.parse(data)
        peopleData.push(player)
        data = JSON.stringify(peopleData)
        fs.writeFile(this.file,data,(err)=>{
            if(err) throw err;
            return false;
        })
        return true;
    }
    public sort(Jugador:Iplayers[]){
        Jugador.sort((a, b) => (b.puntuacion - a.puntuacion));
            return Jugador;
    }
}
export default BackendModel;