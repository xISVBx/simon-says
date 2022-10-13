class view {
    constructor() {
        this._select = this.getElement('#select');
        this._nickname = this.getElement('#username');
        this._puntaje = this.getElement('#puntaje');
        this._reset = this.getElement('#reset');
        this._modalClorereset = this.getElement('#btn-close-reset');
        this._score = this.getElement('#score');
        this._easy = this.getElement('#easy');
        this._difficult = this.getElement("#difficult");
        this._hardcore = this.getElement("#hardcore");
        this._save = this.getElement('#btn-save');
        this._modalClose = this.getElement('#btn-close');
        this._container = this.getElement('.container');
        this._green = this.getElement(".green");
        this._red = this.getElement(".red");
        this._yellow = this.getElement(".yellow");
        this._blue = this.getElement(".blue");
        this._start = this.getElement(".btns");
        this._modal = this.getElement("#modal");
        this._modalreset = this.getElement('#modalreset');
        this._table = this.getElement('#cuerpo');
    }
    get table() {
        return this._table;
    }
    get select() {
        return this._select;
    }
    get nickname() {
        return this._nickname;
    }
    get puntaje() {
        return this._puntaje;
    }
    get reset() {
        return this._reset;
    }
    get modalClorereset() {
        return this._modalClorereset;
    }
    get modalreset() {
        return this._modalreset;
    }
    get score() {
        return this._score;
    }
    get easy() {
        return this._easy;
    }
    get difficult() {
        return this._difficult;
    }
    get hardcore() {
        return this._hardcore;
    }
    get save() {
        return this._save;
    }
    get modalClose() {
        return this._modalClose;
    }
    get container() {
        return this._container;
    }
    get modal() {
        return this._modal;
    }
    get green() {
        return this._green;
    }
    get red() {
        return this._red;
    }
    get yellow() {
        return this._yellow;
    }
    get blue() {
        return this._blue;
    }
    get start() {
        return this._start;
    }
    getElement(selector) {
        const element = document.querySelector(selector);
        return element;
    }
    construirtabla(jugador) {
        var _a;
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
        td1.innerHTML = `${jugador === null || jugador === void 0 ? void 0 : jugador.posicion}`;
        td2.innerHTML = `${jugador === null || jugador === void 0 ? void 0 : jugador.nickname}`;
        td3.innerHTML = `${jugador === null || jugador === void 0 ? void 0 : jugador.puntuacion}`;
        td4.innerHTML = `${jugador === null || jugador === void 0 ? void 0 : jugador.dificultad}`;
        tr1.append(td1);
        tr1.append(td2);
        tr1.append(td3);
        tr1.append(td4);
        (_a = this._table) === null || _a === void 0 ? void 0 : _a.append(tr1);
    }
    borrartabla() {
        var _a, _b, _c;
        while ((_a = this._table) === null || _a === void 0 ? void 0 : _a.firstChild) {
            (_b = this._table) === null || _b === void 0 ? void 0 : _b.removeChild((_c = this._table) === null || _c === void 0 ? void 0 : _c.firstChild);
        }
    }
}
export default view;
