import Jugador from "../interface/Ijugador"
class view{
    private _green:Element|null
    private _red:Element|null
    private _yellow:Element|null
    private  _blue:Element|null
    private  _start:Element|null
    private  _modal:Element|null
    private _modalreset:Element|null
    private _modalClose:Element|null
    private _modalClorereset:Element|null
    private _save:Element|null
    private _container:Element|null
    private _easy:Element|null
    private _difficult:Element|null
    private _hardcore:Element|null
    private _score:Element|null
    private _puntaje:Element|null
    private _reset:Element|null
    private _nickname:Element|null
    private _select:Element|null
    private _table:Element|null
    
    constructor(){
        this._select = this.getElement('#select')
        this._nickname = this.getElement('#username');
        this._puntaje = this.getElement('#puntaje')
        this._reset = this.getElement('#reset')
        this._modalClorereset = this.getElement('#btn-close-reset')
        this._score = this.getElement('#score')
        this._easy = this.getElement('#easy')
        this._difficult = this.getElement("#difficult")
        this._hardcore = this.getElement("#hardcore")
        this._save = this.getElement('#btn-save');
        this._modalClose = this.getElement('#btn-close')
        this._container = this.getElement('.container')
        this._green= this.getElement(".green");
        this._red= this.getElement(".red");
        this._yellow= this.getElement(".yellow");
        this._blue= this.getElement(".blue");
        this._start= this.getElement(".btns");
        this._modal= this.getElement("#modal");
        this._modalreset= this.getElement('#modalreset');
        this._table= this.getElement('#cuerpo')
    }
    get table(){
        return this._table
    }
    get select(){
        return this._select
    }
    get nickname(){
        return this._nickname;
    }
    get puntaje(){
        return this._puntaje
    }
    get reset(){
        return this._reset
    }
    get modalClorereset(){
        return this._modalClorereset
    }
    get modalreset(){
        return this._modalreset;
    }
    get score(){
        return this._score;
    }
    get easy(){
        return this._easy;
    }
    get difficult(){
        return this._difficult;
    }
    get hardcore(){
        return this._hardcore;
    }
    get save(){
        return this._save;
    }
    get modalClose(){
        return this._modalClose;
    }
    get container():Element|null{
        return this._container
    }
    get modal():Element|null{
        return this._modal
    }
    get  green():Element|null{
        return this._green
    }
    get red():Element|null{
        return this._red
    }
    get yellow():Element|null{
        return this._yellow
    }
    get blue():Element|null{
        return this._blue
    }
    get start():Element|null{
        return this._start
    }
    getElement(selector:string) {
        const element = document.querySelector(selector)
        return element
      }
    construirtabla(jugador:Jugador){
        const tr1 =document.createElement("tr");
            const td1= document.createElement("td");
            const td2= document.createElement("td");
            const td3= document.createElement("td");
            const td4= document.createElement("td");
            console.log(tr1)
            console.log(td1)
            console.log(td2)
            console.log(td3)
            console.log(td4)
            td1.innerHTML=`${jugador?.posicion}`;
            td2.innerHTML=`${jugador?.nickname}`;
            td3.innerHTML=`${jugador?.puntuacion}`;
            td4.innerHTML=`${jugador?.dificultad}`;
            tr1.append(td1);
            tr1.append(td2);
            tr1.append(td3);
            tr1.append(td4);
            this._table?.append(tr1);
    }
    borrartabla(): void {
        while(this._table?.firstChild){
            this._table?.removeChild(this._table?.firstChild);
        }
    }
}
export default view