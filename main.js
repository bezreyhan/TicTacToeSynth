function gameCtrl($scope) {
	$scope.board = [['','',''], ['','',''], ['','','']];
	$scope.piece = {value:"O"};
	$scope.counter = 0;
	$scope.xScore = 0;
	$scope.oScore = 0;

	$scope.clicked = function(row,cell) {
		if ($scope.board[row][cell] == "") {
			$scope.piece.value = ($scope.piece.value=="O"?"X":"O");
			$scope.board[row][cell] = $scope.piece.value;
		}
		$scope.counter +=1;
		checkRows($scope);
		checkCol($scope);
		checkCross($scope);
		checkCross2($scope);
		//cats game is checked in checkCross2
	};

	$scope.openUp = function(){
		//reset the board and game variables
		$scope.board = [['','',''], ['','',''], ['','','']];
		$scope.piece = {value:"O"};
		$scope.counter = 0;
		//display the rows
		var rows = document.getElementsByClassName('row');
		for (i=0; i<rows.length; i++) {
			rows[i].style.display = "block";
		}
		//remove the winText
		var winText = document.getElementsByClassName('winText')[0];
		if (document.contains(winText)) {
			winText.parentNode.removeChild(winText);
		}
		//show cell width and height
		var boxArray = document.getElementsByClassName('cell');
		for (i=0; i<boxArray.length; i+=1) {
			boxArray[i].style.width="100px";
			boxArray[i].style.height="100px";
		}
	};

}


function reset($scope) {
	$scope.board = [['','',''], ['','',''], ['','','']];
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
//					WIN LOGIC - Beginning
// -------------------------------------------------		

function checkCol($scope) {
	for (var element=0; element<$scope.board.length; element+=1) {
		var checker = [];
		for (var subArray=0; subArray<$scope.board.length; subArray+=1) {
			checker.push($scope.board[subArray][element]);
		}
		if (checker.join("") == ["XXX"]) {
			win($scope, "x");
		}
		else if (checker.join("") == ["OOO"]) {
			win($scope, "o");
		}

	}
}

var checkRows = function($scope) {
	for (i=0; i<$scope.board.length; i+=1) {
		if ($scope.board[i].join("") == "XXX") {
			win($scope, "x");
		}
		else if ($scope.board[i].join("") == ["OOO"]) {
			win($scope, "o");
		}
	}
};

var checkCross = function ($scope) {
	checker = [];
	for (var i = 0; i<$scope.board.length; i+=1) {
		checker.push($scope.board[i][i]);
	}
	if (checker.join("") == ["XXX"]) {
		win($scope, "x");
	}
	else if (checker.join("") == ["OOO"]) {
		win($scope, "o");
	}
};

var checkCross2 = function ($scope) {
	checker = [];
	subArray = 0;
	console.log("checkcross2")
	for (var i=2; i>=0; i-=1) {
		checker.push($scope.board[subArray][i]);
		subArray +=1;
	}
	if (checker.join("") == ["XXX"]) {
		win($scope, "x");
		return null;
	}
	else if (checker.join("") == ["OOO"]) {
		win($scope, "o");
		return null;
	}
	console.log($scope.counter)
	if ($scope.counter === 9) {
		console.log($scope.counter);
		win($scope, "cat");
	}
};

// -------------------------------------------------
//						WIN LOGIC - End
// -------------------------------------------------	

function win($scope, player) {
	setTimeout( function() {
		reset($scope);
		var rows = document.getElementsByClassName('row');
		for (i=0; i<rows.length; i++)
			rows[i].style.display = "none";
		var winText = document.createElement('div');
		winText.className += "winText";
		if(player == "x") {
			winText.innerHTML = "X Wins";
			$scope.$apply(function() {
				$scope.xScore += 1;
			});
		}
		else if (player == "o") {
			winText.innerHTML = "O Wins";
			$scope.$apply(function(){
				$scope.oScore += 1;
			});
		}
		else if (player == "cat") {
			winText.innerHTML = "Cats Game";
		}
		var frame = document.getElementById('frame');
		frame.appendChild(winText);
	},1000);
}





