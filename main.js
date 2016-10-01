var display;
var turn = true;
var gameCells = []; // { element : link_to_object, state : current_state }

var settings = {
	cellSize: 60, 
	cellMargin: 10,
	boardSize: 8,
	winLimit: 3
};

//var function count(current_position, direction, ) {
	//cell.
//}

walk = function(current, direction, collected) {
	collected = collected || 1;
	console.log(collected);
	var next;
	console.log(direction);
	switch (direction) {
		case 'horizontal':
			next = gameCells[current.y][current.x+1]; 
		break;
		case 'vertical':
			next = gameCells[current.y+1][current.x];
		break;
		case 'diagonal':
			next = gameCells[current.y+1][current.x+1];
		break
	}
	
	console.log(next, current.state+'--->'+next.state);
	if(next) {
		if(next.state === current.state) {
			
			if(collected+1 !== settings.winLimit) {
				return walk(next, direction, collected+1);
			}
			else return true;
		}
	}
	else return false;
}


var checkResult = function(cell) {

	return walk(cell,'horizontal') || walk(cell, 'vertical') || walk(cell, 'diagonal');

}

var cellClick = function(){
	if(this.___cellObj.state==='active') {
		this.classList.remove(this.___cellObj.state);
		this.___cellObj.state = turn ? 'krestik' : 'nolik';
		this.classList.add(this.___cellObj.state);
		
		if(checkResult(this.___cellObj)) {
			document.write('<h2>GAME OVER! ' + (turn ? 'KRESTIK' : 'NOLIK')  + ' WINS</h2>');	
		} else {
			turn = !turn;
		}	
	}
};

var addCell = function(y, x){
	var div = document.createElement('div'); // Here is the DOM element represents the game cell
	var cell = { element: div, state: 'active', x:x, y:y}; //Here is the cell object contains link to DOM object, current state and position of cell on board
	div.___cellObj = cell; // reverse link to cell object.  
	div.classList.add(cell.state);
	div.onclick = cellClick;
	div.style.width = div.style.height = settings.cellSize+'px';
	div.style.top = y*(settings.cellSize+settings.cellMargin)+'px';
	div.style.left = x*(settings.cellSize+settings.cellMargin)+'px';
	display.appendChild(div);

    return cell;

}


//Building board
var buildBoard = function(){
	for(var i=0; i<settings.boardSize; i++) {
        gameCells[i]=[];
        for(var j=0; j<settings.boardSize; j++) {
			gameCells[i][j] = addCell(i,j);
		}
	}
};


window.onload = function(){
	//set the display as a board render place
	display = document.getElementById('display');

	//building board
	buildBoard();
};
