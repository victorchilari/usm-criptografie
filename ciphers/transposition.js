const excludedChar = [' ', ',', '.'];
function myszkowski(text, key) {
	const str_arr = text.split('');
	const clear_str_arr = str_arr.filter(char => !excludedChar.includes(char));
	const arr = [];

	const stringLength = clear_str_arr.length;
	const keyWidth = key.length;

	// Repartition chars into table
	let position = 0;
	for (let j = 0; j < stringLength / keyWidth; j++) {
		arr.push([]);
		for (let i = 0; i < keyWidth; i++) {
			const chr = clear_str_arr[position];
			arr[j].push(chr);
			position++;
			if (position == stringLength) {
				break;
			}
		}
	}

	//// Read data by column and create a final string
	// Read data by column and create an object ////array sorted correct
	let encryptedArr = [];
	const obj = {};
	for (let j = 0; j < keyWidth; j++) {
		let keyIsRepeated = false;
		const curentKey = key[j];
		if (obj[curentKey] === undefined) {
			obj[curentKey] = [];
		} else {
			keyIsRepeated = true;
		}
		for (let i = 0; i < arr.length; i++) {
			const char = arr[i][j];
			if (char !== undefined) {
				if (keyIsRepeated) {
					const position = i * 2 + 1;
					obj[curentKey].splice(position, 0, char);
				} else {
					obj[curentKey].push(char);
				}
				// encryptedArr.push(char);
				//encryptedStr.concat('', char);
			}
		}
	}
	// Parse created object
	const sortedKeys = Object.keys(obj).sort();
	for (const key of sortedKeys) {
		const chrsForThisKey = obj[key].length;
		for (let i = 0; i < chrsForThisKey; i++) {
			const char = obj[key][i];
			encryptedArr.push(char);
		}
	}

	const encryptedStr = encryptedArr.join('');
	console.log(encryptedStr);
	return encryptedStr;
}

myszkowski('WE ARE DISCOVERED. FLEE AT ONCE', 'TOMATO');
