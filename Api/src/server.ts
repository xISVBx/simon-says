import express, {Application,json,urlencoded} from "express";
import BackendRoute from "./routes/BackendRoutes.routes.js"
import Cors from "cors"
class Server {
    //Aplicacion instanciada desde express
    private backend:Application;
    //rutas de la aplicacion
    private backendRoute:BackendRoute
    constructor(){
        this.backend = express();
        this.backendRoute = new BackendRoute();
        this.config()
        this.route()
    }
    //configuracion de la aplicación
    public config = ():void => {
        this.backend.use(Cors())
        this.backend.set('port',3000);
        this.backend.use(json())
        this.backend.use(urlencoded({extended:true}));
    }
    public route = ():void => {
        //las rurtas que se van a usar
        this.backend.use('/jugadores',this.backendRoute.router)
    }
    public start=() =>{
        this.backend.listen(this.backend.get('port'),() => {
            console.log('Server on port: ',this.backend.get('port'))
        })

    }
}

const server = new Server()
server.start()