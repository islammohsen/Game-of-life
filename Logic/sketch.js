var grid;
var currentGrid;
var rows;
var cols;
var resolution = 10;

function setup() {
	createCanvas(1500, 700);
	rows = height / resolution;
	cols = width / resolution;
	create2DArray();
	currentGrid = 0;
}

function draw() {
	background(0);
	drawGrid();
	processGrid();
	currentGrid = (currentGrid + 1) % 2;
}

function processGrid(){
		for(var i = 0; i < rows; i++){
			for(var j = 0; j < cols; j++){
				var lifeNeighbors = getLifeNeighborsNumber(i, j);
				if(grid[currentGrid][i][j] == 0 && lifeNeighbors == 3)
				{
					grid[(currentGrid + 1) % 2][i][j] = 1;
				}
				else if(grid[currentGrid][i][j] == 1 && (lifeNeighbors > 3 || lifeNeighbors < 2)){
					grid[(currentGrid + 1) % 2][i][j] = 0;
				}
				else{
					grid[(currentGrid + 1) % 2][i][j] = grid[currentGrid][i][j];
				}
			}
		}
}

function getLifeNeighborsNumber(x, y){
	var count = 0;
	for(var i = -1; i <= 1; i++){
		for(var j = -1; j <= 1; j++){
			count += grid[currentGrid][(x - i + rows) % rows][(y - j + cols) % cols];
		}
	}
	count -= grid[currentGrid][x][y];
	return count;
}

function drawGrid(){
	for(var i = 0; i < rows; i++){
		for(var j = 0; j < cols; j++){
			var x = j * resolution;
			var y = i * resolution;
			if(grid[currentGrid][i][j] == 1){
				fill(255);
				rect(x, y, resolution, resolution);
			}
		}
	}
}

function create2DArray(){
	grid = new Array(2);
	for(var i = 0; i < 2; i++){
		grid[i] = new Array(rows);
		for(var j = 0; j < rows; j++){
			grid[i][j] = new Array(cols);
		}
	}
	for(var i = 0; i < rows; i++){
		for(var j = 0; j < cols; j++){
			grid[0][i][j] = grid[1][i][j] = floor(random(2));
		}
	}
}
