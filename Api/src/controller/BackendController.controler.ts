import { request, Request, Response } from "express";
import BackendModel from "../model/BackendModel.model.js";

class BackendController{
    private model:BackendModel;
    constructor(){
        this.model = new BackendModel();
    }
    public index = (req:Request, res:Response) =>{
        res.json({'error':1,'msg':'Api: homeDirectory'})
    }
    public insertPlayer = (req:Request, res:Response) =>{
        this.model.insertPlayer(req.body)
        return res.json({'success':1,'insertado':req.body})
    }
    public getAllPlayers = (req:Request, res:Response) =>{
        this.model.getAllPlayers()
        res.json(this.model.getAllPlayers())
    }
    public getPlayers = (req:Request, res:Response) =>{

        try{
            const {level} = req.params
            console.log(level)
        if(level == '0'){
            res.json(this.model.getPlayersEasy())
        }else if(level =='1'){
            res.json(this.model.getPlayersMedium())
        }else if(level =='2'){
            res.json(this.model.getPlayersDifficult())
        }else{
            res.json({"error":"valor no valido"})
        }
        }catch(error){
            res.json({"error":error})
        }
        
    }
}
export default BackendController;