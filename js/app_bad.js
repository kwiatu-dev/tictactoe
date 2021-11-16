const display = document.querySelector('.display');
const images = ['images/o.jpg', 'images/x.jpg'];
let elementPositions;
let round = 0;

const getRowNumber = (index) =>{
    const elementsX = display.getAttribute('data-elementsx') * 1;
    return Math.floor(index / elementsX);
}

const getColNumber = (index) =>{
    const elementsX = display.getAttribute('data-elementsx') * 1;
    return index - elementsX * getRowNumber(index);
}

const setDisplaySize = (elementsX, elementsY) =>{
    display.style.width = `${elementsX * 100}px`;
    display.style.height = `${elementsY * 100}px`;
    display.setAttribute('data-elementsx', elementsX);
    display.setAttribute('data-elementsy', elementsY);

    elementPositions = new Array(elementsX * elementsY).fill(NaN);
}

const getCurrentPlayer = () =>{
    return round++ % 2;
}

const createImg = (src) =>{
    const img = document.createElement('img');
    img.src = src;
    img.classList.add('element__img');

    return img;
}

const checkIsWinning = () =>{
    const elementsX = display.getAttribute('data-elementsx') * 1;
    const elementsY = display.getAttribute('data-elementsy') * 1;
    const elementsCount = elementsX * elementsY;
    const colSum = new Array(3).fill({acc: 0, index: 0});
    const rowSum = new Array(3).fill({acc: 0, index: 0});
    let diagonallyRightSum = 0;
    let diagonallyLeftSum = 0;

    for(let i = 0; i < elementsCount; i++){
        const playerValue = elementPositions[i];
        const colNumber = getColNumber(i);
        const rowNumber = getRowNumber(i);

        colSum[colNumber].acc += playerValue;
        colSum[colNumber].index = rowNumber + 1;
        console.log(colSum[colNumber]);
        console.log(colSum);
        colSum[colNumber].index = 'XD';
        console.log(colSum);
        rowSum[rowNumber].acc += playerValue;
        rowSum[rowNumber].index = colNumber + 1;

        if(rowNumber === colNumber) 
            diagonallyRightSum += playerValue;
        else if(rowNumber === ((elementsX - 1) - colNumber))
            diagonallyLeftSum += playerValue;

        //Check row
        if(rowSum[rowNumber].index === elementsX){
            if(rowSum[rowNumber].acc === elementsX)
                return 1; //Player secound win
            else if(rowSum[rowNumber].acc === 0)
                return 0; //Player first win
        }
        //Check column
        else if(colSum[colNumber].index === elementsX){
            if(colSum[colNumber].acc === elementsX)
                return 1; //Player secound win
            else if(colSum[colNumber] === 0)
                return 0; //Player first win
        }
    }


    if(diagonallyRightSum === elementsX || diagonallyLeftSum === elementsX){
        return 1; //Player secound win
    }
    else if(diagonallyRightSum === 0 || diagonallyLeftSum === 0){
        return 0; //Player first win
    }

    console.log('colSum');
    console.log(colSum);
    console.log('rowSum');
    console.log(rowSum);

    return -1; //nobody wins
}

const selectElement = (e) =>{
    const element = e.currentTarget;
    const elementIndex = element.getAttribute('data-index') * 1;
    const elementsX = display.getAttribute('data-elementsx') * 1;

    if(!Number.isNaN(elementPositions[elementIndex])) return;

    const player = getCurrentPlayer();
    elementPositions[elementIndex] = player;
    console.log(elementPositions);

    const img = createImg(images[player]);
    element.appendChild(img);

    //Check if winning after minimum of rounds
    if(round >= elementsX + elementsX - 1){
        const player = checkIsWinning();

        if(player === 1){
            console.log('Krzyżyk wygrał');
        }
        else if(player === 0){
            console.log('Kółko wygrało');
        }
        else if(player === -1){
            console.log('Nikt nie wygrał');
        }
    }
}

const createElement = () =>{
    const div = document.createElement('div');
    div.classList.add('element');
    div.addEventListener('click', selectElement);

    return div;
}

const setAttributes = (element, elementsX, index) =>{
    const row = getRowNumber(index);
    const col = getColNumber(index);

    element.setAttribute('data-col', col);
    element.setAttribute('data-row', row);
    element.setAttribute('data-index', index);
}

const generateGrid = (elementsX, elementsY) => {
    const elementsCount = elementsX * elementsY;
    setDisplaySize(elementsX, elementsY);

	for (let i = 0; i < elementsCount; i++) {
        const element = createElement();
        setAttributes(element, elementsX, i);
        display.appendChild(element);
    }
};


