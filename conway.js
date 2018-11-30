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
	table_conway.style.margin = "0 auto 0 auto";
	table_conway.style.borderCollapse = "collapse";
	// creating all cells
	for (let i = 0; i < nb_rows; i++) {
		// creates a table_conway row
		let row = document.createElement("tr");
		for (let j = 0; j < nb_cols; j++) {
			// Create a <td> element and a text node, make the text
			// node the contents of the <td>, and put the <td> at
			// the end of the table_conway row
			let cell = document.createElement("td");
			let cellText = document.createTextNode(" ");
			cell.appendChild(cellText);
			cell.style.border = "1px solid black";
			cell.style.width = '5px';
			cell.style.height = '5px';
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
function ConwayLoop(matrix, maxIterations, i){
	matrix = ConwayBuildNextMatrix(matrix);
	ConwayDrawTableFromMatrix(matrix);
	conwayTimeout = setTimeout(function() {
		ConwayLoop(matrix, maxIterations, i)
	}, 100);
	if (i == undefined) {
		var i = 0;
	}
	else {
		i++;
	}
	if (maxIterations && i>=maxIterations) clearTimeout(conwayTimeout);
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
			// analyse neighbors info
			let nb_true = neighborsArray.filter(Boolean).length;
			// change the nextTable according to the neighbors
			if (nb_true < 2 || nb_true > 3) { // death of the cell
				nextMatrix[i].push(false);
			}
			else { // birth or survival of the cell
				nextMatrix[i].push(true);
			}
		}
	}
	return nextMatrix;
}

function ConwayDrawTableFromMatrix(matrix) {
	// if there is already a table conway_table, removes it
	let existing_conway_table = document.getElementById("table_conway");
	if (!(existing_conway_table === 'undefined' || existing_conway_table === null)) {
		existing_conway_table.parentNode.removeChild(existing_conway_table);
	}
	// creates a <table_conway> element and style it
	let table_conway = document.createElement("table");
	table_conway.setAttribute("id", "table_conway");
	table_conway.style.margin = "0 auto 0 auto";
	table_conway.style.borderCollapse = "collapse";
	for (let i = 0; i < matrix.length; i++) {
		// creates a table_conway row
		let row = document.createElement("tr");
		for (let j = 0; j < matrix[i].length; j++) {
			// Create a <td> element and a text node, make the text
			// node the contents of the <td>, and put the <td> at
			// the end of the table_conway row
			let cell = document.createElement("td");
			let cellText = document.createTextNode(" ");
			cell.appendChild(cellText);
			cell.style.border = "1px solid black";
			cell.style.width = '5px';
			cell.style.height = '5px';
			if (matrix[i][j] == true) {
				cell.style.backgroundColor = "black";
			}
			else {
				cell.style.backgroundColor = "white";
			}
			row.appendChild(cell);
		}
		table_conway.appendChild(row);
	}
	// appends <table_conway> into <article>
	document.getElementById("article_conway").appendChild(table_conway);
}

// STOP LOOP (MARCHE PAS, CHANGE L'ALGO !!)
function ConwayStop() {
	if (!(typeof conwayTimeout === 'undefined' || conwayTimeout === null)) {
		clearTimeout(conwayTimeout);
	}
}