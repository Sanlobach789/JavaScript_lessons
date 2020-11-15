'use strict'

function genCharArray(charA, charH) {
    let charArray = [], i = charA.charCodeAt(0), j = charH.charCodeAt(0);
    for (; i <= j; ++i) {
        charArray.push(String.fromCharCode(i));
    }
    return charArray;
}

function genNumbArray(start, end) {
    let numbArray = [];
    for (let i = start; i <= end; i++) {
        numbArray.push(i);
    }

    return numbArray
}

const settings = {
    rowCount: 8,
    colCount: 8,
    chars: genCharArray('a', 'h'),
    numbs: genNumbArray(1, 8),
};

for (let prop in settings) {
    console.log(prop + settings[prop])
}


const chessboard = {
    settings,
    containerElement: null,
    cellElement: null,

    initField() {

    },

    initCells() {

        this.containerElement = document.getElementById('chessboard');
        this.containerElement.innerHTML = '';
        this.cellElements = [];

        for (let row = 0; row < this.settings.rowCount; row++) {
            const tr = document.createElement('tr');
            this.containerElement.appendChild(tr);

            for (let col = 0; col < this.settings.colCount; col++) {
                const td = document.createElement('td');
                if (row%2!=0 && col%2===0){
                    td.style.background = "black"
                }
                else if (row%2===0 && col%2!=0) {
                    td.style.background = "black"
                }

                tr.appendChild(td);
                this.cellElements.push(td);
            }
        }
    },

}

chessboard.initCells();