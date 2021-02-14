console.log(excludedChar);
const convertJtoI = str => {
	return [...str].map(char =>
		char === 'J' || char === 'j' ? (char = 'I') : char.toUpperCase()
	);
};

console.log(convertJtoI('jkiJ'));
const alphabet = 'abcdefghiklmnopqrstuvwxyz'.toUpperCase().split('');

const nihilist = (text, key, cipherKey) => {
	(text = text.toUpperCase()),
		(key = key.toUpperCase()),
		(cipherKey = cipherKey.toUpperCase());
	text = text.split('').filter(char => !excludedChar.includes(char));

	const width = 5;
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

	// Create Tabel that use key
	// const valueArr = key.split('').map(e => e.charCodeAt(0));
	const firstValueEncryptedArr = [];
	for (let k = 0; k < text.length; k++) {
		const toFind = text[k];
		console.log(toFind);

		for (let i = 0; i < width; i++) {
			for (let j = 0; j < key.length; j++) {
				const char = arr[i][j];
				if (char === toFind) {
					firstValueEncryptedArr.push(i * 10 + j + 11);
					break;
				}
			}
		}
	}
	// Create Tabel of value for key
	// const valuesChipherKey = [21, 22, 11, 54];
	const valuesChipherKey = [];
	for (let k = 0; k < cipherKey.length; k++) {
		const toFind = cipherKey[k];
		console.log(toFind);

		for (let i = 0; i < width; i++) {
			for (let j = 0; j < key.length; j++) {
				const char = arr[i][j];
				if (char === toFind) {
					valuesChipherKey.push(i * 10 + j + 11);
					break;
				}
			}
		}
	}
	console.log(valuesChipherKey);

	// Continue encripting
	const secondValueEncryptedArr = [];
	for (let k = 0; k < text.length; k++) {
		const number =
			firstValueEncryptedArr[k] + valuesChipherKey[k % valuesChipherKey.length];
		secondValueEncryptedArr.push(number);
	}

	console.log(arr);
	console.log(firstValueEncryptedArr);
	console.log('Final: ', ...secondValueEncryptedArr);
};

nihilist('the early bird', 'SIMPLE', 'EASY');
