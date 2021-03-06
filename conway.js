let conwayTimeout;

function ConwayGenerateTable(nb_rows, nb_cols, black_probability) {
	if (!(typeof conwayTimeout === 'undefined' || conwayTimeout === null)) {
		clearTimeout(conwayTimeout);
	}
	// If there is already a table conway_table, remove it
	let existing_conway_table = document.getElementById("table-conway");
	if (!(existing_conway_table === 'undefined' || existing_conway_table === null)) {
		existing_conway_table.parentNode.removeChild(existing_conway_table);
	}
	// Create a <table> element
	let table_conway = document.createElement("table");
	table_conway.setAttribute("id", "table-conway");
	// Create all cells
	for (let i = 0; i < nb_rows; ++i) {
		// Create a table-conway row
		let row = document.createElement("tr");
		for (let j = 0; j < nb_cols; ++j) {
			// Creates a <td> element and gives it an ID
			let cell = document.createElement("td");
			cell.setAttribute("id", i + "-" + j);
			// Creates a text node as the contents of the <td>
			// let cellText = document.createTextNode(" ");
			// cell.appendChild(cellText);
			cell.style.backgroundColor = 'white';
			// Random populating
			if (black_probability && Math.random() <= black_probability) cell.style.backgroundColor = "black";
			// Manual populating
			cell.onclick = function () {
				console.log("cell " + i + " , " + j);
				cell.style.backgroundColor == "white" ? cell.style.backgroundColor = "black" : cell.style.backgroundColor = "white";
			};
			row.appendChild(cell); // Add cell to row
		}
		table_conway.appendChild(row); // Add row to table
	}
	document.getElementById("article-conway").appendChild(table_conway); // Append <table-conway> into <article>
}

function ConwayStart(maxIterations=30){
	let startMatrix = ConwayBuildCurrentMatrix();
	ConwayLoop(startMatrix, maxIterations, i=0);
}

function ConwayLoop(matrix, maxIterations, i){
	matrix = ConwayBuildNextMatrix(matrix);
	ConwayDrawTableFromMatrix(matrix);
	conwayTimeout = setTimeout(function() {
		ConwayLoop(matrix, maxIterations, i)
	}, 50);
	// console.log("Iteration " + i); // debug
	if (i>=maxIterations) clearTimeout(conwayTimeout);
	i++;
}

function ConwayBuildCurrentMatrix() {
	let currentMatrix = [];
	let table_conway = document.getElementById("table-conway");
	let nb_rows = table_conway.rows.length;
	let nb_cols = table_conway.rows[0].cells.length;
	for (let i = 0; i < nb_rows; ++i) {
		currentMatrix.push([]);
		for (let j = 0; j < nb_cols; ++j) {
			table_conway.rows[i].cells[j].style.backgroundColor === "black" ? currentMatrix[i].push(true) : currentMatrix[i].push(false);
		}
	}
	// console.log('Current situation:'); // debug
	// console.log(currentMatrix); // debug
	return currentMatrix;
}

function ConwayBuildNextMatrix(currentMatrix) {
	let nextMatrix = [];
	// for each cell
	for (let i = 0; i < currentMatrix.length; ++i) {
		nextMatrix.push([]);
		for (let j = 0; j < currentMatrix[i].length; ++j) {
			// Gather all neighbors info
			var neighborsArray = [];
			// Top neighbors
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
			// Left and right neighbors
			if (currentMatrix[i][j-1] && currentMatrix[i][j-1]==true) {
				neighborsArray.push(true);
			}
			if (currentMatrix[i][j+1] && currentMatrix[i][j+1]==true) {
				neighborsArray.push(true);
			}
			// Down neighbors
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
			// console.log("row " + i + " | column " + j); // debug
			// console.log(neighborsArray); // debug
			// Analyse neighbors info
			let nb_true = neighborsArray.filter(Boolean).length;
			// Change the nextTable according to the neighbors
			if (currentMatrix[i][j]==true && (nb_true < 2 || nb_true > 3)) { // Death of an an alive cell
				nextMatrix[i].push(false);
			}
			else if (currentMatrix[i][j] == false && nb_true == 3) { // Birth of a cell
				nextMatrix[i].push(true);
			}
			else { // Keep the same cell
				nextMatrix[i].push(currentMatrix[i][j]);
			}
		}
	}
	return nextMatrix;
}

function ConwayDrawTableFromMatrix(matrix) {
	// console.log(document.getElementById("table-conway")); // debug
	for (let i = 0; i < matrix.length; ++i) {
		for (let j = 0; j < matrix[i].length; ++j) {
			let cell = document.getElementById(i + "-" + j);
			matrix[i][j] == true ? cell.style.backgroundColor = "black" : cell.style.backgroundColor = "white";
		}
	}
}

function ConwayStop() {
	if (!(typeof conwayTimeout === 'undefined' || conwayTimeout === null)) {
		clearTimeout(conwayTimeout);
	}
}

function ConwayReset(nb_rows, nb_cols) {
	ConwayGenerateTable(nb_rows, nb_cols);
}
