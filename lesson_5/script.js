'use strict'

const settings = {
    rowCount: 8,
    colCount: 8,
    chars: ['','A','B','C','D','E','F','G','H'],
    numbs: [1,2,3,4,5,6,7,8]
};

const chessboard = {
    settings,
    containerElement: null,
    cellElement: null,

    initCells() {

        this.containerElement = document.getElementById('chessboard');
        this.containerElement.innerHTML = '';
        this.cellElements = [];

        let chars = document.createElement('tr');
        for (let i = 0; i < settings.chars.length; i++){
            const th = document.createElement('th');
            th.innerHTML = settings.chars[i];
            chars.appendChild(th);
        }
        this.containerElement.appendChild(chars);

        for (let row = 0; row < this.settings.rowCount; row++) {
            const tr = document.createElement('tr');
            const th = document.createElement('th');
            th.innerHTML = settings.numbs[row];
            this.containerElement.appendChild(tr);
            tr.appendChild(th);

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
}
}

chessboard.initCells();