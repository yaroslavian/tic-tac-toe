var display;
var turn = true;
var gameCells = [];

var settings = {
	cellSize: 60, 
	cellMargin: 10,
	boardSize: 5
};

//var function count(current_position, direction, ) {
	//cell.
//}

var checkResult = function(cell) {
	//checking horisontal
		
	//checking vertical
	
	//checking diagonal



	return false;
}

var cellClick = function(){
	if(this.classList.contains('active')) {
		this.classList.remove('active');

		this.classList.add( turn ? 'krestik' : 'nolik' );
		
		if(checkResult(this)) {
			document.write('<h2>GAME OVER! ' + (turn ? 'KRESTIK' : 'NOLIK')  + ' WINS</h2>');	
		} else {
			turn = !turn;
		}	
	}
};

var addCell = function(x, y){
	var div = document.createElement('div');
	div.classList.add('active','x'+x, 'y'+y);
	div.onclick = cellClick;
	div.style.width = div.style.height = settings.cellSize+'px';
	div.style.top = y*(settings.cellSize+settings.cellMargin)+'px';
	div.style.left = x*(settings.cellSize+settings.cellMargin)+'px';
	gameCells[x] = // [y]
	=div; 
	display.appendChild(div);
}


//Building board
var buildBoard = function(){
	for(var i=0; i<settings.boardSize; i++) {
		for(var j=0; j<settings.boardSize; j++) {
			addCell(i,j);
		}
	}
};


window.onload = function(){
	//set the display as a board render place
	display = document.getElementById('display');

	//building board
	buildBoard();
};
