var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
import view from "../view/view.js";
import model from "../model/model.js";
var vista = new view;
var modelo = new model;
//generar un color aleatorio
function pushPattern() {
    modelo.addNewColorToPattern();
    console.log(modelo.colorspattern);
}
//inicializar el juego
function startGame() {
    //console.log(modelo.leveltemp)
    console.log(modelo.level);
    console.log(modelo.matriztable);
    modelo.resetGame();
    vista.score.innerHTML = `${modelo.score}`;
    modelo.addNewColorToPattern();
    modelo.turn = false;
    console.log('restart');
    showSteps();
}
//prender la luz del juego
function addcolor(step) {
    if (step == 'G') {
        var hover = vista.green;
        hover.style.backgroundColor = 'rgb(0, 255, 0)';
    }
    else if (step == 'R') {
        var hover = vista.red;
        hover.style.backgroundColor = 'rgb(255, 0, 0)';
    }
    else if (step == 'Y') {
        var hover = vista.yellow;
        hover.style.backgroundColor = 'rgb(255, 255, 0)';
    }
    else {
        var hover = vista.blue;
        hover.style.backgroundColor = 'rgb(0, 0, 255)';
    }
}
//apagar la luz del juego
function removecolor(step) {
    if (step == 'G') {
        var hover = vista.green;
        hover.style.backgroundColor = null;
    }
    else if (step == 'R') {
        var hover = vista.red;
        hover.style.backgroundColor = null;
    }
    else if (step == 'Y') {
        var hover = vista.yellow;
        hover.style.backgroundColor = null;
    }
    else {
        var hover = vista.blue;
        hover.style.backgroundColor = null;
    }
}
//prender y hacer sonar el boton qeu se especifique
function playStep(step) {
    addcolor(step);
    playSound(step);
    setTimeout(function () {
        removecolor(step);
    }, modelo.tempo);
}
function playSound(step) {
    var sonido = modelo.sounds[step]();
    sonido.play();
}
//mostrar el patron
function showSteps() {
    var _a, _b, _c, _d;
    console.log(modelo.colorspattern);
    modelo.turn = false;
    (_a = vista.green) === null || _a === void 0 ? void 0 : _a.classList.remove("ongreen");
    (_b = vista.red) === null || _b === void 0 ? void 0 : _b.classList.remove("onred");
    (_c = vista.yellow) === null || _c === void 0 ? void 0 : _c.classList.remove("onyellow");
    (_d = vista.blue) === null || _d === void 0 ? void 0 : _d.classList.remove("onblue");
    //vista.start?.removeEventListener('click', startGame)
    let num = 0;
    let moves = setInterval(function () {
        var _a, _b, _c, _d;
        checkInterface(num);
        num++;
        if (num >= modelo.colorspattern.length) {
            modelo.turn = true;
            (_a = vista.green) === null || _a === void 0 ? void 0 : _a.classList.add("ongreen");
            (_b = vista.red) === null || _b === void 0 ? void 0 : _b.classList.add("onred");
            (_c = vista.yellow) === null || _c === void 0 ? void 0 : _c.classList.add("onyellow");
            (_d = vista.blue) === null || _d === void 0 ? void 0 : _d.classList.add("onblue");
            console.log(modelo.turn);
            clearInterval(moves);
        }
    }, modelo.tempo * 2);
}
function esperadora(ms) {
    return new Promise(res => setTimeout(res, ms));
}
//play sounds
function checkInterface(num) {
    if (modelo.colorspattern[num] == 'G') {
        playStep('G');
    }
    else if (modelo.colorspattern[num] == 'R') {
        playStep('R');
    }
    else if (modelo.colorspattern[num] == 'Y') {
        playStep('Y');
    }
    else if (modelo.colorspattern[num] == 'B') {
        playStep('B');
    }
}
//validate
function validate(step) {
    if (modelo.turn) {
        verify(modelo.index, step);
        modelo.index = modelo.index + 1;
    }
}
//verify color
function verify(index, step) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        if (modelo.colorspattern[index] == step && modelo.colorspattern.length - 1 == index) {
            pushPattern();
            modelo.index = -1;
            playSound(modelo.colorspattern[index]);
            modelo.score += 5;
            vista.score.innerHTML = `${modelo.score}`;
            console.log('gano' + modelo.score);
            yield esperadora(1000);
            showSteps();
        }
        else if (modelo.colorspattern[index] != step) {
            (_a = vista.start) === null || _a === void 0 ? void 0 : _a.addEventListener('click', startGame);
            vista.puntaje.innerHTML = `${modelo.score}`;
            openModal(vista.modal);
            console.log('perdio');
        }
        else if (modelo.colorspattern[index] == step) {
            playSound(modelo.colorspattern[index]);
        }
    });
}
//open modal
function openModal(modal) {
    modal.style.display = "block";
    modal.classList.add("modal-container");
    modal.classList.add("show");
    modal.classList.add("toggle");
}
function hideModal(modal) {
    modal.style.display = "none";
    modal.classList.remove("modal-container");
    modal.classList.remove("show");
    modal.classList.remove("toggle");
}
function prechacgueDifficult(level) {
    modelo.leveltemp = level;
    openModal(vista.modalreset);
}
function changueDifficulty(level) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    if (modelo.levels[level] == modelo.levels[0]) {
        (_a = vista.easy) === null || _a === void 0 ? void 0 : _a.classList.add("btnblueon");
        (_b = vista.difficult) === null || _b === void 0 ? void 0 : _b.classList.remove("btnyellowon");
        (_c = vista.hardcore) === null || _c === void 0 ? void 0 : _c.classList.remove("btnredon");
        modelo.resetGame();
        vista.score.innerHTML = `${modelo.score}`;
        modelo.tempo = 700;
        modelo.level = 0;
        console.log(modelo.level);
        hideModal(vista.modalreset);
    }
    else if (modelo.levels[level] == modelo.levels[1]) {
        (_d = vista.difficult) === null || _d === void 0 ? void 0 : _d.classList.add("btnyellowon");
        (_e = vista.easy) === null || _e === void 0 ? void 0 : _e.classList.remove("btnblueon");
        (_f = vista.hardcore) === null || _f === void 0 ? void 0 : _f.classList.remove("btnredon");
        modelo.resetGame();
        vista.score.innerHTML = `${modelo.score}`;
        modelo.level = 1;
        console.log(modelo.level);
        modelo.tempo = 500;
        hideModal(vista.modalreset);
    }
    else if (modelo.levels[level] == modelo.levels[2]) {
        (_g = vista.hardcore) === null || _g === void 0 ? void 0 : _g.classList.add("btnredon");
        (_h = vista.easy) === null || _h === void 0 ? void 0 : _h.classList.remove("btnblueon");
        (_j = vista.difficult) === null || _j === void 0 ? void 0 : _j.classList.remove("btnyellowon");
        modelo.resetGame();
        vista.score.innerHTML = `${modelo.score}`;
        modelo.level = 2;
        console.log(modelo.level);
        modelo.tempo = 100;
        hideModal(vista.modalreset);
    }
}
function save() {
    if (vista.nickname.value != '') {
        modelo.addScoreToTable(vista.nickname.value);
        localStorage.setItem('matriz', JSON.stringify(modelo.matriztable));
        console.log(vista.select.selectedOptions[0].value);
        if (vista.select.selectedOptions[0].value == '1') {
            insertTable(0);
        }
        else if (vista.select.selectedOptions[0].value == '2') {
            insertTable(1);
        }
        else if (vista.select.selectedOptions[0].value == '3') {
            insertTable(2);
        }
        //insertTable()
        hideModal(vista.modal);
        console.log(modelo.matriztable);
    }
    else {
        alert('ingresa un nickname');
    }
}
function insertTable(level) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    console.log(level);
    console.log(modelo.matriztable[level].length);
    if (modelo.matriztable[level].length != undefined) {
        while ((_a = vista.table) === null || _a === void 0 ? void 0 : _a.firstChild) {
            (_b = vista.table) === null || _b === void 0 ? void 0 : _b.removeChild((_c = vista.table) === null || _c === void 0 ? void 0 : _c.firstChild);
        }
        for (let i = 0; i < modelo.matriztable[level].length; i++) {
            const tr1 = document.createElement("tr");
            const td1 = document.createElement("td");
            const td2 = document.createElement("td");
            const td3 = document.createElement("td");
            const td4 = document.createElement("td");
            console.log(tr1);
            console.log(td1);
            console.log(td2);
            console.log(td3);
            console.log(td4);
            td1.innerHTML = `${(_d = modelo.matriztable[level][i]) === null || _d === void 0 ? void 0 : _d.posicion}`;
            td2.innerHTML = `${(_e = modelo.matriztable[level][i]) === null || _e === void 0 ? void 0 : _e.nickname}`;
            td3.innerHTML = `${(_f = modelo.matriztable[level][i]) === null || _f === void 0 ? void 0 : _f.puntuacion}`;
            td4.innerHTML = `${(_g = modelo.matriztable[level][i]) === null || _g === void 0 ? void 0 : _g.dificultad}`;
            tr1.append(td1);
            tr1.append(td2);
            tr1.append(td3);
            tr1.append(td4);
            (_h = vista.table) === null || _h === void 0 ? void 0 : _h.append(tr1);
        }
    }
}
(_a = vista.start) === null || _a === void 0 ? void 0 : _a.addEventListener('click', startGame);
(_b = vista.green) === null || _b === void 0 ? void 0 : _b.addEventListener('click', () => { validate('G'); });
(_c = vista.red) === null || _c === void 0 ? void 0 : _c.addEventListener('click', () => { validate('R'); });
(_d = vista.yellow) === null || _d === void 0 ? void 0 : _d.addEventListener('click', () => { validate('Y'); });
(_e = vista.blue) === null || _e === void 0 ? void 0 : _e.addEventListener('click', () => { validate('B'); });
(_f = vista.modalClose) === null || _f === void 0 ? void 0 : _f.addEventListener('click', () => { hideModal(vista.modal); });
(_g = vista.modalClorereset) === null || _g === void 0 ? void 0 : _g.addEventListener('click', () => { hideModal(vista.modalreset); });
(_h = vista.easy) === null || _h === void 0 ? void 0 : _h.addEventListener('click', () => { prechacgueDifficult(0); });
(_j = vista.difficult) === null || _j === void 0 ? void 0 : _j.addEventListener('click', () => { prechacgueDifficult(1); });
(_k = vista.hardcore) === null || _k === void 0 ? void 0 : _k.addEventListener('click', () => { prechacgueDifficult(2); });
(_l = vista.reset) === null || _l === void 0 ? void 0 : _l.addEventListener('click', () => { changueDifficulty(modelo.leveltemp); });
(_m = vista.save) === null || _m === void 0 ? void 0 : _m.addEventListener('click', save);
(_o = vista.select) === null || _o === void 0 ? void 0 : _o.addEventListener('change', (event) => {
    let i = 0;
    if (event.target.value == '1') {
        i = 0;
    }
    else if (event.target.value == '2') {
        i = 1;
    }
    else {
        i = 2;
    }
    insertTable(i);
});
