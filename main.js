function gameCtrl($scope) {
	$scope.board = [['','',''], ['','',''], ['','','']];
	$scope.piece = {value:"O"};

	$scope.clicked = function(row,cell) {
		if ($scope.board[row][cell] == "") {
			$scope.piece.value = ($scope.piece.value=="O"?"X":"O");
			$scope.board[row][cell] = $scope.piece.value;
		}
		checkRows($scope);
		checkCol($scope);
		checkCross($scope);
		checkCross2($scope);
	};
}

function openUp() {
	boxArray = document.getElementsByClassName('cell');
	for (i=0; i<boxArray.length; i+=1) {
		boxArray[i].style.width="100px";
		boxArray[i].style.height="100px";
	}
}

function reset() {
	var cells = document.getElementsByClassName('cell');
	for (i=0; i<cells.length; i++) {
		cells[i].style.width = "0";
		cells[i].style.height = "0";
		cells[i].style.backgroundColor = "transparent";
		cells[i].innerHTML = "&nbsp;";
	}
	counter = 0;
}

// -------------------------------------------------
// 						WIN LOGIC
// -------------------------------------------------		

function checkCol($scope) {
	for (var element=0; element<$scope.board.length; element+=1) {
		var checker = [];
		for (var subArray=0; subArray<$scope.board.length; subArray+=1) {
			checker.push($scope.board[subArray][element]);
		}
		if (checker.join("") == ["XXX"]) {
			setTimeout(function() {win("x")},1500);
		}
		else if (checker.join("") == ["OOO"]) {
			setTimeout(function() {win("o")},1500);
		}

	}
}

var checkRows = function($scope) {
	for (i=0; i<$scope.board.length; i+=1) {
		if ($scope.board[i].join("") == "XXX") {
			console.log("x wins");
			setTimeout(function() {win("x")},1500);
		}
		else if ($scope.board[i].join("") == ["OOO"]) {
			setTimeout(function() {win("o")},1500);
		}
	}
};

var checkCross = function ($scope) {
	checker = [];
	for (var i = 0; i<$scope.board.length; i+=1) {
		checker.push($scope.board[i][i]);
	}
	if (checker.join("") == ["XXX"]) {
		setTimeout(function() {win("x")},1500);
	}
	else if (checker.join("") == ["OOO"]) {
		setTimeout(function() {win("o")},1500);
	}
};

var checkCross2 = function ($scope) {
	checker = [];
	subArray = 0;
	for (var i=2; i>=0; i-=1) {
		checker.push($scope.board[subArray][i]);
		subArray +=1;
	}
	if (checker.join("") == ["XXX"]) {
		setTimeout(function() {win("x")},1500);
	}
	else if (checker.join("") == ["OOO"]) {
		setTimeout(function() {win("o")},1500);
	}
};


function win(player) {
	reset();
	var rows = document.getElementsByClassName('row');
	for (i=0; i<rows.length; i++)
		rows[i].style.display = "none";
	var winText = document.createElement('div');
	winText.className += "winText";
	if(player == "x") {
		winText.innerHTML = "X Wins";
	}
	else {
		winText.innerHTML = "O Wins";
	}
	var frame = document.getElementById('frame');
	frame.appendChild(winText);
}	




