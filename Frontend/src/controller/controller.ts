import view from "../view/view.js"
import model from "../model/model.js"
import { Audio } from "../model/model.js"


var vista:view = new view
var modelo:model = new model


//generar un color aleatorio
function pushPattern():void {   
    modelo.addNewColorToPattern()
    console.log(modelo.colorspattern)
}
//inicializar el juego
function startGame():void{
    //console.log(modelo.leveltemp)
    console.log(modelo.level)
    modelo.resetGame();
    (vista.score as HTMLElement).innerHTML = `${modelo.score}`;
    modelo.addNewColorToPattern()
    modelo.turn = false
    showSteps()
}
//prender la luz del juego
function addcolor(step: keyof Audio):void{
    if(step == 'G'){
        var hover: null|Element= vista.green;
        (hover as HTMLElement)!.style.backgroundColor='rgb(0, 255, 0)'
    }else if(step == 'R'){
        var hover: Element|null= vista.red;
        (hover as HTMLElement)!.style.backgroundColor='rgb(255, 0, 0)'
    }else if(step == 'Y'){
        var hover: Element|null= vista.yellow;
        (hover as HTMLElement)!.style.backgroundColor='rgb(255, 255, 0)'
    }else{
        var hover: Element|null= vista.blue;
        (hover as HTMLElement)!.style.backgroundColor='rgb(0, 0, 255)'
    }
}
//apagar la luz del juego
function removecolor(step: keyof Audio):void{
    if(step == 'G'){
        var hover: Element|null= vista.green;
        (hover as HTMLElement)!.style.backgroundColor=null!
        
    }else if(step == 'R'){
        var hover: Element|null= vista.red;
        (hover as HTMLElement)!.style.backgroundColor=null!
    }else if(step == 'Y'){
        var hover: Element|null= vista.yellow;
        (hover as HTMLElement)!.style.backgroundColor=null!
    }else{
        var hover: Element|null= vista.blue;
        (hover as HTMLElement)!.style.backgroundColor=null!
    }
}
//prender y hacer sonar el boton qeu se especifique
function playStep(step: keyof Audio):void {
    addcolor(step)
    playSound(step)
    setTimeout(function(){
        removecolor(step)
    }, modelo.tempo);
}
function playSound(step: keyof Audio){
    var sonido = modelo.sounds[step]()
    sonido.play()
}
//mostrar el patron
function showSteps(): void {
    console.log(modelo.colorspattern)
    modelo.turn = false
    
    vista.green?.classList.remove("ongreen");
    vista.red?.classList.remove("onred");
    vista.yellow?.classList.remove("onyellow");
    vista.blue?.classList.remove("onblue");
    //vista.start?.removeEventListener('click', startGame)
    let num: number = 0;
    let moves =  setInterval(function(){
        checkInterface(num)
        num++;
        if (num >= modelo.colorspattern.length) {
            modelo.turn = true
            vista.green?.classList.add("ongreen");
            vista.red?.classList.add("onred");
            vista.yellow?.classList.add("onyellow");
            vista.blue?.classList.add("onblue");
            console.log(modelo.turn)
            clearInterval(moves);
        }
    }, modelo.tempo*2);

}

function esperadora(ms:number){
    return new Promise(res=>setTimeout(res, ms));
}

//play sounds
function checkInterface(num:number):void {
    if(modelo.colorspattern[num] == 'G'){
        playStep('G')
    }else if(modelo.colorspattern[num] == 'R'){
        playStep('R')
    }else if(modelo.colorspattern[num] == 'Y'){
        playStep('Y')
    }else if(modelo.colorspattern[num] == 'B'){
        playStep('B')
    }
}
//validate
function validate(step: keyof Audio): void {
    if(modelo.turn){
        verify(modelo.index,step)
        modelo.index = modelo.index +1
    }
    
}
//verify color
async function verify(index:number,step: keyof Audio){
    if(modelo.colorspattern[index] == step && modelo.colorspattern.length - 1 == index){
        pushPattern()
        modelo.index = -1
        playSound(modelo.colorspattern[index] as keyof Audio)
        modelo.score += 5;
        (vista.score as HTMLElement).innerHTML = `${modelo.score}`;
        console.log('gano'+modelo.score)
        await esperadora(1000)
        showSteps()
        
    }else if(modelo.colorspattern[index] != step){
        vista.start?.addEventListener('click', startGame);
        (vista.puntaje as HTMLElement).innerHTML = `${modelo.score}`;
        openModal(vista.modal as HTMLElement)
        console.log('perdio')
    }else if(modelo.colorspattern[index] == step){
        playSound(modelo.colorspattern[index] as keyof Audio)
    }
}

//open modal
function openModal(modal:HTMLElement) {
    modal.style.display = "block";
    modal.classList.add("modal-container");
    modal.classList.add("show");
    modal.classList.add("toggle")
}
function hideModal(modal: HTMLElement) {
    modal.style.display = "none";
    modal.classList.remove("modal-container");
    modal.classList.remove("show");
    modal.classList.remove("toggle")
}
function prechacgueDifficult(level:number):void{
    modelo.leveltemp = level
    openModal(vista.modalreset as HTMLElement)
}
function changueDifficulty(level:number):void{
    if(modelo.levels[level] == modelo.levels[0]){
        vista.easy?.classList.add("btnblueon")
        vista.difficult?.classList.remove("btnyellowon")
        vista.hardcore?.classList.remove("btnredon")
        modelo.resetGame();
        (vista.score as HTMLElement).innerHTML = `${modelo.score}`;
        modelo.tempo=700
        modelo.level = 0
        console.log(modelo.level)
        hideModal(vista.modalreset as HTMLElement)
    }else if(modelo.levels[level] == modelo.levels[1]){
        vista.difficult?.classList.add("btnyellowon")
        vista.easy?.classList.remove("btnblueon")
        vista.hardcore?.classList.remove("btnredon")
        modelo.resetGame();
        (vista.score as HTMLElement).innerHTML = `${modelo.score}`;
        modelo.level = 1
        console.log(modelo.level)
        modelo.tempo=500
        hideModal(vista.modalreset as HTMLElement)
    }else if(modelo.levels[level] == modelo.levels[2]){
        vista.hardcore?.classList.add("btnredon")
        vista.easy?.classList.remove("btnblueon")
        vista.difficult?.classList.remove("btnyellowon")
        modelo.resetGame();
        (vista.score as HTMLElement).innerHTML = `${modelo.score}`;
        modelo.level = 2
        console.log(modelo.level)
        modelo.tempo=100
        hideModal(vista.modalreset as HTMLElement)
    }
}
function save():void{
    if((vista.nickname as HTMLInputElement).value!=''){

        modelo.addScoreToTable((vista.nickname as HTMLInputElement).value);

        if((((vista.select as HTMLSelectElement).selectedOptions as HTMLCollection)[0] as HTMLOptionElement).value =='1'){

            insertTable(0)

        }else if((((vista.select as HTMLSelectElement).selectedOptions as HTMLCollection)[0] as HTMLOptionElement).value =='2'){

            insertTable(1)

        }else if((((vista.select as HTMLSelectElement).selectedOptions as HTMLCollection)[0] as HTMLOptionElement).value =='3'){
            insertTable(2)
        }
        hideModal(vista.modal as HTMLElement)
    }else{
        alert('ingresa un nickname')
    }
    
}
async function insertTable(level:number):Promise<void>{
    let tabla = await modelo.getPlayer(level)
    if(tabla.length!=0){
        vista.borrartabla()
        for(let i=0;i<tabla.length;i++){
            tabla[i].posicion = i+1;
            console.log(tabla[i])
            vista.construirtabla(tabla[i])
        }
    }else{
        vista.borrartabla()
    }
    
}

vista.start?.addEventListener('click', startGame)
vista.green?.addEventListener('click', ()=>{validate('G')})
vista.red?.addEventListener('click', ()=>{validate('R')})
vista.yellow?.addEventListener('click', ()=>{validate('Y')})
vista.blue?.addEventListener('click', ()=>{validate('B')})
vista.modalClose?.addEventListener('click',()=>{hideModal(vista.modal as HTMLElement)})
vista.modalClorereset?.addEventListener('click',()=>{hideModal(vista.modalreset as HTMLElement)})
vista.easy?.addEventListener('click', ()=>{prechacgueDifficult(0)})
vista.difficult?.addEventListener('click', ()=>{prechacgueDifficult(1)})
vista.hardcore?.addEventListener('click', ()=>{prechacgueDifficult(2)})
vista.reset?.addEventListener('click', ()=>{changueDifficulty(modelo.leveltemp as number)})
vista.save?.addEventListener('click',save)
vista.select?.addEventListener('change', (event) => {
    let i:number = 0
    if((event.target as HTMLSelectElement).value =='1'){
        i=0
    }else if((event.target as HTMLSelectElement).value =='2'){
        i=1
    }else{
        i=2
    }
    insertTable(i)
    
});


//prueba del fetch

async function prueba (){
    return fetch('http://localhost:3000/jugadores/jugadores/1')
    .then((Response)=>Response.json())
    .then((data)=>{
        console.log(data)
        return data
    })
}
prueba()
