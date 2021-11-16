class TicTacToe{
    constructor(gameSetup) {
        this.display = document.querySelector(gameSetup.display);
        this.restartBtn = document.querySelector(gameSetup.restartBtn);
        this.images = gameSetup.images;
        this.squareSize = gameSetup.squareSize;
        this.elementsCount = gameSetup.squareSize * gameSetup.squareSize;
        this.elementPositions = new Array(gameSetup.squareSize).fill(NaN).map(() => new Array(gameSetup.squareSize).fill(NaN));
        this.round = 0;
    }

    generateGrid = () => {
        this.setDisplaySize();
    
        for (let i = 0; i < this.elementsCount; i++) {
            const element = this.createElement();
            this.setAttributes(element, i);
            this.display.appendChild(element);
        }
    };

    setDisplaySize = () =>{
        this.display.style.width = `${this.squareSize * 100}px`;
        this.display.style.height = `${this.squareSize * 100}px`;
    }

    setAttributes = (element, index) =>{
        const row = this.getRowNumber(index);
        const col = this.getColNumber(index);
        element.setAttribute('data-col', col);
        element.setAttribute('data-row', row);
        element.setAttribute('data-index', index);
        element.classList.add('active');
    }

    getRowNumber = (index) =>{
        return Math.floor(index / this.squareSize);
    }
    
    getColNumber = (index) =>{
        return index - this.squareSize * this.getRowNumber(index);
    }

    createElement = () =>{
        const div = document.createElement('div');
        div.classList.add('element');
        div.addEventListener('click', this.selectElement);
    
        return div;
    }

    selectElement = (e) =>{
        const element = e.currentTarget;
        element.classList.remove('active');
        const elementRow = element.getAttribute('data-row') * 1;
        const elementCol = element.getAttribute('data-col') * 1;
    
        if(!Number.isNaN(this.elementPositions[elementRow][elementCol])) return;
    
        const player = this.getCurrentPlayer();
        this.elementPositions[elementRow][elementCol] = player;
    
        const img = this.createImg(this.images[player]);
        element.appendChild(img);

        //Check is all elements are used
        if(this.round == this.elementsCount){
            this.addResetButton();
        }
    
        //Check if winning after minimum of rounds
        if(this.round >= this.squareSize + this.squareSize - 1){
            const player = this.checkIsWinning();
            if(player === -1) return;
            this.playerWin(player);
        }
    }

    getCurrentPlayer = () =>{
        return this.round++ % 2;
    }

    createImg = (src) =>{
        const img = document.createElement('img');
        img.src = src;
        img.classList.add('element__img');
    
        return img;
    }

    checkIsWinning = () =>{
        let diagonallyRightSum = 0
        let diagonallyLeftSum = 0
    
        for(let i = 0; i < this.squareSize; i++){
            let colSum = 0;
            let rowSum = 0;

            for(let row = 0; row < this.squareSize; row++){
                const col = i;
                colSum += this.elementPositions[row][col]; 
            }

            if(colSum === this.squareSize)
                return 1; //Player secound win
            else if(colSum === 0)
                return 0; //Player first win

            for(let col = 0; col < this.squareSize; col++){
                const row = i;
                rowSum += this.elementPositions[row][col]; 
            }

            if(rowSum === this.squareSize)
                return 1; //Player secound win
            else if(rowSum === 0)
                return 0; //Player first win

            diagonallyRightSum += this.elementPositions[i][i];
            diagonallyLeftSum += this.elementPositions[i][(this.squareSize - 1) - i];
        }
        
        if(diagonallyRightSum === this.squareSize || diagonallyLeftSum === this.squareSize){
            return 1; //Player secound win
        }
        
        else if(diagonallyRightSum === 0 || diagonallyLeftSum === 0){
            return 0; //Player first win
        }
    
        return -1; //nobody wins
    }

    addResetButton = () =>{
        this.display.classList.add('deactivate');
        this.restartBtn.classList.remove('hidden');
    }

    playerWin = (player) =>{
        if(player === 1){
            //this.display.innerHTML = '<h1>Krzyżyk wygrał!</h1>';
            this.addResetButton();
        }
        else if(player === 0){
            //this.display.innerHTML = '<h1>Kółko wygrało</h1>';
            this.addResetButton();
        }
    }

    restartGame = () =>{
        this.restartBtn.classList.add('hidden');
        this.display.classList.remove('deactivate');
        this.round = 0;
        this.elementPositions = new Array(this.squareSize).fill(NaN).map(() => new Array(this.squareSize).fill(NaN));
        this.display.innerHTML = '';
        this.generateGrid();
    }
}

const gameSetup = {
    display: '.display',
    restartBtn: '.restart-btn',
    images: ['images/o.jpg', 'images/x.jpg'],
    squareSize: 3
}

const game = new TicTacToe(gameSetup);

initGame = () =>{
    game.generateGrid();
}

restartGame = () =>{
    game.restartGame();
}


