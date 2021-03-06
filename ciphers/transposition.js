const excludedChar = [" ", ",", "."];
export function myszkowski(text, key) {
  const str_arr = text.split("");
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

  const encryptedStr = encryptedArr.join("");
  console.log(obj);
  console.log(encryptedStr);
  return encryptedStr;
}

export function myszkowskiDecrypt(text, keyWord) {
  const str_arr = text.split("");
  const arr = [];

  // Create object
  const sortedKeys = keyWord.split("").sort();
  const uniqueSortedKeys = sortedKeys.filter(function(item, pos) {
    return sortedKeys.indexOf(item) === pos;
  });

  const undefinedCells = text.length % uniqueSortedKeys.length;
  let rows;
  undefinedCells > 0
    ? (rows = text.length / uniqueSortedKeys.length + 1)
    : (rows = text.length / uniqueSortedKeys.length);

  const obj = {};
  let position = 0;
  //! uniqueSortedKeys
  for (const key of uniqueSortedKeys) {
    if (obj[key] === undefined) {
      obj[key] = [];
    }
    const howMuchOfMe = sortedKeys.filter(e => e === key).length;
    //const needToDelete = howMuchOfMe;
    // -1 becouse influence on length
    // part created for this code to work correct. Decrypter is wrote bad
    const haveUndefined = keyWord.indexOf(key) + 1 > undefinedCells;
    let howBigIam = howMuchOfMe + rows - 1;
    if (haveUndefined) howBigIam--;
    // const howBigIam = howMuchOfMe * (keyWord.length - howMuchOfMe + 1);
    for (let i = 0; i < howBigIam; i++) {
      if (
        howMuchOfMe === 1 &&
        keyWord.indexOf(key) + 1 > undefinedCells &&
        i + 2 == keyWord.length
      )
        break;
      const chr = str_arr[position];
      obj[key].push(chr);
      position++;
    }
  }
  // console.log(obj);

  for (const key in obj) {
    if (obj[key].length < rows) {
      arr.push([]);
      obj[key].forEach(e => {
        arr[arr.length - 1].push(e);
      });
    } else {
      const howMuchOfMe = sortedKeys.filter(e => e === key).length;
      const arrOfKey = [];
      for (let i = 0; i < howMuchOfMe; i++) {
        arrOfKey.push([]);
      }
      for (let i = 0; i < obj[key].length; i++) {
        const char = obj[key][i];
        const row = i % howMuchOfMe;
        arrOfKey[row].push(char);
      }
      arr.push(...arrOfKey);
    }
  }
  console.log(arr);

  // const correctPostitio = keyWord.split('').map((e, i) => {
  // 	return;
  // });

  const ascii = ["T", "O", "M", "A", "T", "O"].map(e => e.charCodeAt());
  const asciiFromZero = ascii.map(e => e - 65);
  for (let i = 0; i < asciiFromZero.length; i++) {
    while (asciiFromZero[i] > 0) {
      asciiFromZero[i]--;
    }

    for (let k = 0; k < i; k++) {
      if (ascii[k] > ascii[i]) asciiFromZero[k]++;
      else asciiFromZero[i]++;
    }
  }

  // console.log(asciiFromZero);
  // const correctPostitio = [4, 2, 1, 0, 5, 3];
  const correctPostitio = asciiFromZero;
  const correctSortedArr = [];
  for (let j = 0; j < correctPostitio.length; j++) {
    const index = correctPostitio[j];
    const row = arr[index];
    correctSortedArr.push(row);
  }
  console.log(correctSortedArr);

  const decryptedArr = [];
  for (let j = 0; j < correctSortedArr[0].length; j++) {
    for (let i = 0; i < correctSortedArr.length; i++) {
      const char = correctSortedArr[i][j];
      decryptedArr.push(char);
    }
  }

  const decryptedStr = decryptedArr.join("");
  console.log(decryptedStr);
  return decryptedStr;
}

myszkowskiDecrypt(
  myszkowski("WE ARE DISCOVERED. FLEE AT ONCE", "TOMATO"),
  "TOMATO"
);
