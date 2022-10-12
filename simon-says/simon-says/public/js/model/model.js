class model {
    constructor() {
        this._jugador = {
            dificultad: 0,
            posicion: 0,
            nickname: '',
            puntuacion: 0
        };
        if (localStorage.getItem('matriz') == null) {
            this._matriztable = new Array(3);
            for (var i = 0; i < this._matriztable.length; i++) {
                this._matriztable[i] = [];
            }
        }
        else
            (this._matriztable = JSON.parse(localStorage.getItem('matriz')));
        this._level = 0;
        this._leveltemp = 0;
        this._levels = ['easy', 'difficult', 'hardcore'];
        this._score = 0;
        this._tempo = 700;
        this._index = 0;
        this._turn = false;
        this._colors = ['G', 'R', 'Y', 'B'];
        this._colorsPattern = [];
        this._sounds = {
            G: () => { return new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'); },
            R: () => { return new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3'); },
            Y: () => { return new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3'); },
            B: () => { return new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3'); }
        };
    }
    get jugador() {
        return this._jugador;
    }
    set jugador(value) {
        this._jugador = value;
    }
    get level() {
        return this._level;
    }
    set level(value) {
        this._level = value;
    }
    get matriztable() {
        return this._matriztable;
    }
    get leveltemp() {
        return this._leveltemp;
    }
    set leveltemp(value) {
        this._leveltemp = value;
    }
    get levels() {
        return this._levels;
    }
    get score() {
        return this._score;
    }
    set score(value) {
        this._score = value;
    }
    get tempo() {
        return this._tempo;
    }
    set tempo(value) {
        this._tempo = value;
    }
    get index() {
        return this._index;
    }
    set index(value) {
        this._index = value;
    }
    get colors() {
        return this._colors;
    }
    get colorspattern() {
        return this._colorsPattern;
    }
    get turn() {
        return this._turn;
    }
    set turn(value) {
        this._turn = value;
    }
    get sounds() {
        return this._sounds;
    }
    addNewColorToPattern() {
        var long = this._colorsPattern.length;
        this._colorsPattern = [];
        for (let i = 0; i < long + 1; i++) {
            let color = Math.floor((Math.random() * (3 - 0 + 1)) + 0);
            this._colorsPattern.push(this._colors[color]);
        }
    }
    addScoreToTable(player) {
        this._jugador = {
            dificultad: this._level,
            posicion: 0,
            nickname: player,
            puntuacion: this.score
        };
        var repeat = false;
        for (let i = 0; i < this._matriztable[this._level].length; i++) {
            if (this._matriztable[this._level][i].nickname == this._jugador.nickname) {
                repeat = true;
                if (this._matriztable[this._level][i].puntuacion < this._jugador.puntuacion) {
                    this._matriztable[this._level][i].puntuacion = this._jugador.puntuacion;
                }
                else {
                    return;
                }
            }
            else {
                repeat = false;
            }
        }
        console.log(repeat);
        if (repeat == false) {
            if (this._matriztable[this._level].length == 0) {
                this.jugador.posicion = 1;
                this._matriztable[this._level].push(this._jugador);
            }
            else {
                this._matriztable[this._level].push(this._jugador);
                this._matriztable[this._level] = this.selectionSort(this._matriztable[this._level]);
                for (let i = 0; i < this._matriztable[this._level].length; i++) {
                    this._matriztable[this._level][i].posicion = i + 1;
                }
            }
        }
    }
    resetGame() {
        this._colorsPattern = [];
        this._index = 0;
        this._score = 0;
    }
    comparador(a, b) {
        if (a.puntuacion < b.puntuacion) {
            return 1;
        }
        else if (a.puntuacion > b.puntuacion) {
            return -1;
        }
        else {
            return 0;
        }
    }
    selectionSort(arr) {
        for (let i = 0; i < arr.length; i++) {
            let lowest = i;
            for (let j = i + 1; j < arr.length; j++) {
                if (this.comparador(arr[j], arr[lowest]) == -1) {
                    lowest = j;
                }
            }
            if (lowest !== i) {
                // Swap
                ;
                [arr[i], arr[lowest]] = [arr[lowest], arr[i]];
            }
        }
        return arr;
    }
}
export default model;
