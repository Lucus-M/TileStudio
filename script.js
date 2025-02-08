/*
    <div class="tile selected">
        <img src="sampleImgs/tile1.png">
    </div>
*/

let tileSelector = document.getElementById("tileSelector");

let tileSize = {
    x: 16,
    y: 16
}

let numOfTiles = 3;
let tileSelectorArray = new Array(numOfTiles);
let selectedTile = 0;

let tileImages = new Array(numOfTiles);
let tileImgSrcs = new Array(numOfTiles);

function select(i){
    tileSelectorArray[selectedTile].element.classList.remove("selected");
    tileSelectorArray[i].element.classList.add("selected");

    selectedTile = i;
}

for(let i = 0; i < numOfTiles; i++){
    tileSelectorArray[i] = {
        element: null,
        img: null,
    }

    tileSelectorArray[i].element = document.createElement("div");
    tileSelectorArray[i].element.classList.add("tile");
    if(i == selectedTile){
        tileSelectorArray[i].element.classList.add("selected");
    }

    tileSelectorArray[i].element.addEventListener("click", function(){
        select(i);
    });

    tileSelectorArray[i].img = new Image();

    if(i == 0){
        tileSelectorArray[i].img.src = "sampleImgs/transparentbg.png";
    }
    else if(i % 2 == 0){
        tileSelectorArray[i].img.src = "sampleImgs/tile1.png";
    }
    else{
        tileSelectorArray[i].img.src = "sampleImgs/tile2.png";
    }

    console

    tileSelectorArray[i].element.innerHTML = "<img src='" + tileSelectorArray[i].img.src + "'>";

    tileSelector.appendChild(tileSelectorArray[i].element);
}

let cvs = document.getElementById("mainCanvas");
let ctx = cvs.getContext("2d");

let cvsx;
let cvsy;

resize();

let tileArray = new Array(cvs.height / tileSize.y);

for(let y = 0; y < tileArray.length; y++){
    tileArray[y] = new Array(cvs.width / tileSize.x); 
    for(let x = 0; x < tileArray[y].length; x++){
        tileArray[y][x] = 0;
    }
}

console.log(tileArray);

console.log(`CvsY: ${cvsy}, CvsX: ${cvsx}`);

function resize(){
    let containerWidth = document.getElementById("canvasContainer").offsetWidth;
    let containerHeight = document.getElementById("canvasContainer").offsetHeight;

    //console.log(containerWidth);
    //console.log(containerHeight);

    cvs.width = containerWidth - (containerWidth % tileSize.x);
    cvs.height = containerHeight - (containerHeight % tileSize.y);

    //console.log(cvs.width);
    //console.log(cvs.height);

    cvsy = cvs.getBoundingClientRect().y;
    cvsx = cvs.getBoundingClientRect().x;

    //console.log(`CvsY: ${cvsy}, CvsX: ${cvsx}`);
}

function redrawCanvas(){
    ctx.clearRect(0, 0, cvs.width, cvs.height);
    
    for(let y = 0; y < tileArray.length; y++){
        for(let x = 0; x < tileArray[y].length; x++){
            if(tileArray[y][x] != 0){
                ctx.drawImage(tileSelectorArray[tileArray[y][x]].img, x*tileSize.x, y*tileSize.y);
            }
        }
    }
}

let X, y, tileX, tileY, clicking;

function updateMousePos(event){
    x = event.clientX;
    y = event.clientY;

    tileX = Math.floor((x-cvsx)/tileSize.x);
    tileY = Math.floor((y-cvsy)/tileSize.y);
}

function updateTile(ty, tx){
    tileArray[ty][tx] = selectedTile;
}

cvs.addEventListener('mousemove', (event) => {
    
    updateMousePos(event);

    if(clicking){
        updateTile(tileY, tileX);
    }

    redrawCanvas();

    //cursor
    ctx.beginPath();
    ctx.strokeStyle = "white";
    ctx.rect(tileX*tileSize.x, tileY*tileSize.y, tileSize.x, tileSize.y);
    ctx.stroke();
    //console.log(`Mouse X: ${tileX}, Mouse Y: ${tileY}`);
});

cvs.addEventListener('mousedown', (event) => {
    clicking = true;
    updateTile(tileY, tileX);
    redrawCanvas();
})

cvs.addEventListener('mouseup', function(){
    clicking = false;
})

redrawCanvas();