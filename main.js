var display;
var turn = true;
var gameCells = []; // { element : link_to_object, state : current_state }

var settings = {
	cellSize: 60,
	cellMargin: 10,
	boardSize: 8,
	winLimit: 5
};

var system = (function(){
	return {
		applyStyles: function(elem, styles) {
			for(style in styles) {
				elem.style[style] = styles[style];
			}
			return elem;
		},
		addButton: function(parent, name, callback){
			var button = document.createElement('div');
			button.innerHTML = '<span>'+ name +'</span>';
			button.classList.add('button');	
			button.onclick = callback;
			parent.appendChild(button);
			return button;
		}
	}
}());



walk = function(current, direction, collected, rev) { //rev -> reverse direction (bool)
	collected = collected || 1;

	console.log(collected, 'y= '+current.y,'x= '+current.x);
	var next = {}; // 2 props: next.x, next.y
	console.log(direction);

	switch (direction) {
		case 'horizontal':
			next.x = rev ? current.x-1 : current.x+1;
			next.y = current.y;
			break;
		case 'vertical':
			next.x = current.x;
			next.y = rev ? current.y-1 : current.y+1;
			break;
		case 'diagonal':
			next.x = rev ? current.x-1 : current.x+1;
			next.y = rev ? current.y-1 : current.y+1;
			break;
		case 'reverse-diagonal':
			next.x = rev ? current.x+1 : current.x-1;
			next.y = rev ? current.y-1 : current.y+1;
			break;
	}

	if(gameCells[next.y] && gameCells[next.y][next.x]) next = gameCells[next.y][next.x]; //
	else next = false;

	console.log(next, next && current.state+'--->'+next.state);

		if(next && current.state === next.state) {
			if(collected+1 !== settings.winLimit) {
				return walk(next, direction, collected+1, rev);
			}
			else return true;
		} else {
			if(rev) {
				return false;
			} else {
				return walk(current, direction, 1, true);
			}
		}
}


var checkResult = function(cell) {

	return walk(cell,'horizontal') || walk(cell, 'vertical') || walk(cell, 'diagonal') || walk(cell, 'reverse-diagonal');

}

var cellClick = function(){
	if(this.___cellObj.state==='active') {
		this.classList.remove(this.___cellObj.state);
		this.___cellObj.state = turn ? 'krestik' : 'nolik';
		this.classList.add(this.___cellObj.state);

		if(checkResult(this.___cellObj)) {
			document.write('<h2>GAME OVER! ' + (turn ? '<span style="color:silver">KRESTIK</span>' : '<span style="color:orange">NOLIK</span>')  + ' WINS</h2>');
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

//Building control panel
var buildPanel = function() {

	var panel = document.createElement('div');
	panel.classList.add('panel');

	var closeButton = system.addButton(panel, 'Close', function() {
		this.parentNode.style.display = 'none';
	});

	document.body.appendChild(panel);
};




window.onload = function(){
//feature
//render game menu
//start game

	//set the display as a board render place
	display = document.getElementById('display');

	//building board
	buildBoard();

	//Build control panel
	buildPanel();

};
