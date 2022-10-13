import { Router } from "express";
import BackendController from "../controller/BackendController.controler.js";

class BackendRoute{
    public router: Router;
    private backendController:BackendController

    constructor(){
        this.router = Router();
        this.backendController = new BackendController();
        this.config()
        
    }
    public config = () => {
        //rutas
        this.router.get('/')
        this.router.post('/jugadores',this.backendController.insertPlayer)
        this.router.get('/jugadores',this.backendController.getAllPlayers)
        this.router.get('/jugadores/:level',this.backendController.getPlayers)
    }
}
export default BackendRoute;