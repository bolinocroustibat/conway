function ConwayGenerateTable(nb_rows, nb_cols, black_probability) {
	if (!(typeof conwayTimeout === 'undefined' || conwayTimeout === null)) {
		clearTimeout(conwayTimeout);
	}
	// if there is already a table conway_table, removes it
	let existing_conway_table = document.getElementById("table_conway");
	if (!(existing_conway_table === 'undefined' || existing_conway_table === null)) {
		existing_conway_table.parentNode.removeChild(existing_conway_table);
	}
	// creates a <table_conway> element and style it
	let table_conway = document.createElement("table");
	table_conway.setAttribute("id", "table_conway");
	// creating all cells
	for (let i = 0; i < nb_rows; i++) {
		// creates a table_conway row
		let row = document.createElement("tr");
		for (let j = 0; j < nb_cols; j++) {
			// Create a <td> element and a text node, make the text
			// node the contents of the <td>, and put the <td> at
			// the end of the table_conway row
			let cell = document.createElement("td");
			cell.setAttribute("id", i + "-" + j);
			// let cellText = document.createTextNode(" ");
			// cell.appendChild(cellText);
			cell.style.border = "1px solid black";
			cell.style.width = '4px';
			cell.style.height = '4px';
			// random populating
			if (black_probability) {
				Math.random() >= black_probability ? cell.style.backgroundColor = "white" : cell.style.backgroundColor = "black";
			}
			// manual populating
			cell.onclick = function () {
				console.log("cell " + i + " , " + j);
				if (cell.style.backgroundColor = "white") cell.style.backgroundColor = "black";
				else cell.style.backgroundColor = "white";
			};
			// add cell to row
			row.appendChild(cell);
		}
		// add row to table
		table_conway.appendChild(row);
	}
	// appends <table_conway> into <article>
	document.getElementById("article_conway").appendChild(table_conway);
}

function ConwayStart(maxIterations){
	let startMatrix = ConwayBuildCurrentMatrix();
	ConwayLoop(startMatrix, maxIterations);
}

// LOOP
function ConwayLoop(matrix, maxIterations=30, i=0){
	matrix = ConwayBuildNextMatrix(matrix);
	ConwayDrawTableFromMatrix(matrix);
	conwayTimeout = setTimeout(function() {
		ConwayLoop(matrix, maxIterations, i)
	}, 10);
	// console.log("##########")
	// console.log(maxIterations)
	// console.log("ITERATION " + i);
	if (i>=maxIterations) clearTimeout(conwayTimeout);
	i++;
}

function ConwayBuildCurrentMatrix() {
	let currentMatrix = [];
	let table_conway = document.getElementById("table_conway");
	let nb_rows = table_conway.rows.length;
	let nb_cols = table_conway.rows[0].cells.length;
	for (let i = 0; i < nb_rows; i++) {
		currentMatrix.push([]);
		for (let j = 0; j < nb_cols; j++) {
			if (table_conway.rows[i].cells[j].style.backgroundColor === "black") {
				currentMatrix[i].push(true);
			}
			else {
				currentMatrix[i].push(false);
			}
		}
	}
	// console.log("CURRENT SITUATION :");
	// console.log(currentMatrix);
	return currentMatrix;
}

function ConwayBuildNextMatrix(currentMatrix) {
	let nextMatrix = [];
	// for each cell
	for (let i = 0; i < currentMatrix.length; i++) {
		nextMatrix.push([]);
		for (let j = 0; j < currentMatrix[i].length; j++) {
			// gather all neighbors info
			var neighborsArray = [];
			// top neighbors
			if (currentMatrix[i-1]) {
				if (currentMatrix[i-1][j-1] && currentMatrix[i-1][j-1]==true) {
					neighborsArray.push(true);
				}
				if (currentMatrix[i-1][j] && currentMatrix[i-1][j]==true) {
					neighborsArray.push(true);
				}
				if (currentMatrix[i-1][j+1] && currentMatrix[i-1][j+1]==true) {
					neighborsArray.push(true);
				}
			}
			// left and right neighbors
			if (currentMatrix[i][j-1] && currentMatrix[i][j-1]==true) {
				neighborsArray.push(true);
			}
			if (currentMatrix[i][j+1] && currentMatrix[i][j+1]==true) {
				neighborsArray.push(true);
			}
			// down neighbors
			if (currentMatrix[i+1]) {
				if (currentMatrix[i+1][j-1] && currentMatrix[i+1][j-1]==true) {
					neighborsArray.push(true);
				}
				if (currentMatrix[i+1][j] && currentMatrix[i+1][j]==true) {
					neighborsArray.push(true);
				}
				if (currentMatrix[i+1][j+1] && currentMatrix[i+1][j+1]==true) {
					neighborsArray.push(true);
				}
			}
			// console.log("row " + i + " | column " + j);
			// console.log(neighborsArray);
			// analyse neighbors info
			let nb_true = neighborsArray.filter(Boolean).length;
			// change the nextTable according to the neighbors
			if (currentMatrix[i][j]==true && (nb_true < 2 || nb_true > 3)) { // death of an an alive cell
				nextMatrix[i].push(false);
			}
			else if (currentMatrix[i][j] == false && nb_true == 3) { // birth of a cell
				nextMatrix[i].push(true);
			}
			else { // keep the same cell
				nextMatrix[i].push(currentMatrix[i][j]);
			}
		}
	}
	return nextMatrix;
}

function ConwayDrawTableFromMatrix(matrix) {
	console.log(document.getElementById("table_conway")); // TEST
	for (let i = 0; i < matrix.length; i++) {
		for (let j = 0; j < matrix[i].length; j++) {
			console.log(document.getElementById("0-0")); // TEST
			// var cell = document.getElementById(i + "-" + j);
			// if (matrix[i][j] == true) {
			// 	cell.style.backgroundColor = "black";
			// }
			// else {
			// 	cell.style.backgroundColor = "white";
			// }
		}
	}
}

// STOP LOOP (MARCHE PAS, CHANGE L'ALGO !!)
function ConwayStop() {
	if (!(typeof conwayTimeout === 'undefined' || conwayTimeout === null)) {
		clearTimeout(conwayTimeout);
	}
}