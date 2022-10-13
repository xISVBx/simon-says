import Audio from '../interface/Iaudio'
import Jugador from '../interface/Ijugador';
class model{
    private _url:string
    private _jugador: Jugador
    private _colors:Array<string>
    private _colorsPattern:Array<string>
    private _levels:Array<string>
    private _sounds:Audio
    private _turn:boolean
    private _index:number
    private _tempo:number
    private _score:number
    private _leveltemp:number
    private _level:number
    constructor(){
        this._url = 'http://localhost:3000/jugadores/jugadores/'
        this._jugador = {
            dificultad: 0,
            posicion: 0,
            nickname: '',
            puntuacion: 0
        }
        this._level = 0
        this._leveltemp = 0 
        this._levels = ['easy','difficult','hardcore']
        this._score=0;
        this._tempo = 700
        this._index = 0
        this._turn = false
        this._colors = ['G','R','Y','B']
        this._colorsPattern = []
        this._sounds = {
            G:()=> {return new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3')} , 
            R:()=> {return new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3')}, 
            Y:()=> {return new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3')}, 
            B:()=> {return new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3')}
        }
    }
    get jugador(){
        return this._jugador
    }
    set jugador(value:Jugador) {
        this._jugador = value
    }
    get level(){
        return this._level;
    }
    set level(value: number) {
        this._level = value;
    }
    get leveltemp(){
        return this._leveltemp
    }
    set leveltemp(value:number){
        this._leveltemp = value
    }
    get levels(){
        return this._levels;
    }
    get score(){
        return this._score
    }
    set score(value:number) {
        this._score = value;
    }
    get tempo(){
        return this._tempo
    }
    set tempo(value:number){
        this._tempo = value
    }
    get index(){
        return this._index
    }
    set index(value:number) {
        this._index = value
    }
    get colors(){
        return this._colors
    }
    get colorspattern(){
        return this._colorsPattern
    }
    get turn(){
        return this._turn
    }
    set turn(value:boolean){
        this._turn = value
    }
    get sounds(){
        return this._sounds
    }
    addNewColorToPattern():void{
        var long = this._colorsPattern.length
        this._colorsPattern = []
        for (let i = 0; i < long+1;i++){
            let color:number = Math.floor((Math.random() * (3 - 0 + 1)) + 0);
            this._colorsPattern.push(this._colors[color])
        }
    }
    addScoreToTable(player:string):Promise<any>{
        this._jugador = {
            dificultad: this._level+1,
            posicion: 0,
            nickname: player,
            puntuacion: this.score
        }
        console.log('entro')
        return fetch(this._url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(this._jugador)
        }).then(response=>response.json())
        .then((data:Jugador)=>{return data})
        
    }
    resetGame():void{
        this._colorsPattern = []
        this._index = 0
        this._score = 0
    }
    comparador(a:Jugador, b:Jugador) {
        if (a.puntuacion<b.puntuacion) {
          return 1;
        }
        else if (a.puntuacion>b.puntuacion) {
          return -1;
        }
        else 
        {
            return 0;
        }
      }
      
    selectionSort(arr:Array<Jugador>) {
        for (let i = 0; i < arr.length; i++) {
          let lowest = i
          for (let j = i + 1; j < arr.length; j++) {
            if(this.comparador(arr[j], arr[lowest])==-1){

              lowest = j
            }
          }
          if (lowest !== i) {
            // Swap
            ;[arr[i], arr[lowest]] = [arr[lowest], arr[i]]
          }
        }
        return arr
    }
    getPlayer (id:number):Promise<Jugador[]>{
        return fetch(`${this._url}${id}`)
        .then((Response)=>Response.json())
        .then((data)=>data)
    }
    async ordenarJson():Promise<void>{
        this.getPlayer(this.level+1)
    }
}

export default model
export {Audio}
