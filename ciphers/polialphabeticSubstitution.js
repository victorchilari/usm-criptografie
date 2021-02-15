const rareChar = 'Z';
// todo rareChar <- input by user

const playfair = (text, key) => {
	(text = text.toUpperCase()), (key = key.toUpperCase());
	text = text.split('').filter(char => !excludedChar.includes(char));

	const arr = [];
	// Create Tabel based on cipher key
	let position = 0;
	let wasSwitchedToAlphabet = false;
	for (let i = 0; i < width; i++) {
		arr.push([]);
		for (let j = 0; j < width; j++) {
			let char;
			if (key[position] !== undefined) {
				char = key[position];
				position++;
			} else if (!wasSwitchedToAlphabet) {
				wasSwitchedToAlphabet = true;
			}

			if (wasSwitchedToAlphabet) {
				// https://stackoverflow.com/a/14824303
				let oneDarray = [];
				for (let i = 0; i < arr.length; i++) {
					oneDarray = oneDarray.concat(arr[i]);
				}

				char = alphabet.filter(e => !oneDarray.includes(e))[0];
			}
			arr[i][j] = char;
		}
	}

	// Trebuie de creat un tabel ce contine cupluri de litere
	// in caz ca ele se aseamana, intre ele se introduce litera X (ex.)
	const arrOfCouple = [];
	for (let i = 0; i < text.length; i += 2) {
		const char1 = text[i];
		let char2 = text[i + 1];
		if (char1 === char2 || char2 === undefined) {
			char2 = rareChar;
			i -= 1;
		}
		arrOfCouple.push([char1, char2]);
	}

	// Find in table
	// Case analysis
	const valueEncryptedArr = [];
	for (let k = 0; k < arrOfCouple.length; k++) {
		const toFind0 = arrOfCouple[k][0];
		const toFind1 = arrOfCouple[k][1];

		const xy0 = [],
			xy1 = [];
		for (let i = 0; i < width; i++) {
			for (let j = 0; j < width; j++) {
				const char = arr[i][j];
				if (char === toFind0 && xy0.length === 0) {
					xy0.push(i, j);
				} else if (char === toFind1 && xy1.length === 0) {
					xy1.push(i, j);
				} else if (xy0.length === 1 && xy1.length === 1) {
					break;
					// poate fi scris ca if separat, dar se va executa de mai multe ori
				}
			}
		}

		const inSameColumn = xy0[1] === xy1[1];
		const inSameRow = xy0[0] === xy1[0];
		if (inSameColumn) {
			// console.log('In same column: ', toFind0, toFind1);
			// Recalculation
			let recalY0 = xy0[0] + 1;
			let recalY1 = xy1[0] + 1;
			if (recalY0 == width) {
				recalY0 = 0;
			} else if (recalY1 == width) {
				recalY1 = 0;
			}

			// Apply
			const newChar0 = arr[recalY0][xy0[1]];
			const newChar1 = arr[recalY1][xy1[1]];
			valueEncryptedArr.push([newChar0, newChar1]);
		} else if (inSameRow) {
			// console.log('In same row: ', toFind0, toFind1);
			// Recalculation
			let recalX0 = xy0[1] + 1;
			let recalX1 = xy1[1] + 1;
			if (recalX0 == width) {
				recalX0 = 0;
			} else if (recalX1 == width) {
				recalX1 = 0;
			}

			// Apply
			const newChar0 = arr[xy0[0]][recalX0];
			const newChar1 = arr[xy1[0]][recalX1];
			valueEncryptedArr.push([newChar0, newChar1]);
		} else {
			// console.log('Else: ', toFind0, toFind1);

			// Apply
			const newChar0 = arr[xy0[0]][xy1[1]];
			const newChar1 = arr[xy1[0]][xy0[1]];
			valueEncryptedArr.push([newChar0, newChar1]);
		}
	}

	const beautifyArr = [];
	for (let i = 0; i < valueEncryptedArr.length; i++) {
		beautifyArr.push(...valueEncryptedArr[i]);
	}
	console.log(beautifyArr);
	return beautifyArr.join('');
};

playfair('instruments', 'monarchy');
// playfair('clocks will run more quickly during free time', 'MURPHY');

const playfairDecrypt = (text, key) => {
	(text = text.toUpperCase()), (key = key.toUpperCase());
	text = text.split('').filter(char => !excludedChar.includes(char));

	const arr = [];

	// Create Tabel based on cipher key
	let position = 0;
	let wasSwitchedToAlphabet = false;
	for (let i = 0; i < width; i++) {
		arr.push([]);
		for (let j = 0; j < width; j++) {
			let char;
			if (key[position] !== undefined) {
				char = key[position];
				position++;
			} else if (!wasSwitchedToAlphabet) {
				wasSwitchedToAlphabet = true;
			}

			if (wasSwitchedToAlphabet) {
				// https://stackoverflow.com/a/14824303
				let oneDarray = [];
				for (let i = 0; i < arr.length; i++) {
					oneDarray = oneDarray.concat(arr[i]);
				}

				char = alphabet.filter(e => !oneDarray.includes(e))[0];
			}
			arr[i][j] = char;
		}
	}

	// Trebuie de creat un tabel ce contine cupluri de litere
	// in caz ca ele se aseamana, intre ele se introduce litera X (ex.)
	const arrOfCouple = [];
	for (let i = 0; i < text.length; i += 2) {
		const char1 = text[i];
		let char2 = text[i + 1];
		if (char1 === char2 || char2 === undefined) {
			char2 = rareChar;
			i -= 1;
		}
		arrOfCouple.push([char1, char2]);
	}

	// Find in table
	// Case analysis
	const valueEncryptedArr = [];
	for (let k = 0; k < arrOfCouple.length; k++) {
		const toFind0 = arrOfCouple[k][0];
		const toFind1 = arrOfCouple[k][1];

		const xy0 = [],
			xy1 = [];
		for (let i = 0; i < width; i++) {
			for (let j = 0; j < width; j++) {
				const char = arr[i][j];
				if (char === toFind0 && xy0.length === 0) {
					xy0.push(i, j);
				} else if (char === toFind1 && xy1.length === 0) {
					xy1.push(i, j);
				} else if (xy0.length === 1 && xy1.length === 1) {
					break;
					// poate fi scris ca if separat, dar se va executa de mai multe ori
				}
			}
		}

		const inSameColumn = xy0[1] === xy1[1];
		const inSameRow = xy0[0] === xy1[0];
		if (inSameColumn) {
			// Recalculation
			let recalY0 = xy0[0] - 1;
			let recalY1 = xy1[0] - 1;
			if (recalY0 == width) {
				recalY0 = width - 1;
			} else if (recalY1 == width) {
				recalY1 = width - 1;
			}

			// Apply
			const newChar0 = arr[recalY0][xy0[1]];
			const newChar1 = arr[recalY1][xy1[1]];
			valueEncryptedArr.push([newChar0, newChar1]);
		} else if (inSameRow) {
			// Recalculation
			let recalX0 = xy0[1] - 1;
			let recalX1 = xy1[1] - 1;
			if (recalX0 === -1) {
				recalX0 = width - 1;
			} else if (recalX1 === -1) {
				recalX1 = width - 1;
			}

			// Apply
			const newChar0 = arr[xy0[0]][recalX0];
			const newChar1 = arr[xy1[0]][recalX1];
			valueEncryptedArr.push([newChar0, newChar1]);
		} else {
			// Apply
			const newChar0 = arr[xy0[0]][xy1[1]];
			const newChar1 = arr[xy1[0]][xy0[1]];
			valueEncryptedArr.push([newChar0, newChar1]);
		}
	}
	//debugger;

	const beautifyArr = [];
	for (let i = 0; i < valueEncryptedArr.length; i++) {
		beautifyArr.push(...valueEncryptedArr[i]);
	}
	console.log(beautifyArr);
	return beautifyArr.join('');
};

playfairDecrypt(playfair('instruments', 'monarchy'), 'monarchy');
