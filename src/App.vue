<template>
  <div class="container">
    <div class="title">Sisteme de criptare clasice</div>
  </div>
  <div class="container">
    <div class="area">
      <div class="area-title">Precizati tipul sistemului de criptare</div>
      <div class="area-content radio">
        <input
          v-model="selectedCipher"
          type="radio"
          name="sdc"
          id="ccp"
          value="ccp"
        />
        <label for="ccp">Cifru cu permutare</label>
        <input
          v-model="selectedCipher"
          type="radio"
          name="sdc"
          id="ccs"
          value="ccs"
        />
        <label for="ccs">Cifru cu substitutie</label>
        <input
          v-model="selectedCipher"
          type="radio"
          name="sdc"
          id="cmcpss"
          value="cmcpss"
        />
        <label for="cmcpss">Cifru mixt cu permutare si substitutie</label>
      </div>
    </div>
  </div>
  <div class="container">
    <select
      v-model="selectedCCS"
      v-if="selectedCipher == 'ccs'"
      name="cifru_cu_substitutie"
      id="cifru_cu_substitutie"
    >
      <option value="ccsm">Cifru cu substitutie monoalfabetica</option>
      <option value="ccsp">Cifru cu substitutie polialfabetica</option>
    </select>
  </div>
  <div class="container">
    <div class="area">
      <div class="area-title">Prezentarea cifrului</div>
      <div class="area-content">
        <span class="area-content__title" id="ChipherTitle">
          {{
            selectedCipher == "ccs"
              ? ciphers[selectedCCS][0]
              : ciphers[selectedCipher][0]
          }}
        </span>
        <button @click="popupOpenInfo" class="popup-link">
          Descrierea cifrului
        </button>
        <button @click="popupOpenUse" class="popup-link">
          Utilizarea cifrului
        </button>
      </div>
    </div>
  </div>
  <div class="container"></div>
  <div class="popup" id="popupInfo">
    <div class="popop__body">
      <div class="popup__content">
        <a @click="closePopupAnyway" class="popup__close">x</a>
        <div class="popup__title">
          {{
            selectedCipher == "ccs"
              ? ciphers[selectedCCS][0]
              : ciphers[selectedCipher][0]
          }}, descriere
        </div>
        <div class="popup__text">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nam
          itaque beatae? Sapiente, labore consequatur atque quaerat doloribus
          architecto a. Rerum quibusdam delectus quam dolor placeat ratione
          praesentium aspernatur numquam!
        </div>
        <button @click="popupOpenUse" class="popup-link">
          Utilizarea cifrului
        </button>
      </div>
    </div>
  </div>
  <div class="popup" id="popupUse">
    <div class="popop__body">
      <div class="popup__content">
        <a @click="closePopupAnyway" class="popup__close">x</a>
        <div class="popup__title">
          {{
            selectedCipher == "ccs"
              ? ciphers[selectedCCS][0]
              : ciphers[selectedCipher][0]
          }}, utilizare
        </div>
        <div class="popup__text">
          <textarea v-model="toEncrypt" type="text" />
          <textarea v-model="secretKey" type="text" />
          <textarea v-model="cipherKey" type="text" />
          <textarea v-model="toDecrypt" type="text" />
          <br />
          <button @click="encrypt()">Encrypt</button>
          <button @click="decrypt()">
            Decrypt
          </button>
        </div>
        <button @click="popupOpenInfo" class="popup-link">
          Descrierea cifrului
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      ciphers: {
        ccp: ["Cifrul cu transpozitie Myszkowski"],
        ccsm: ["Cifrul nihilist"],
        ccsp: ["Cifrul Playfair"],
        cmcpss: ["Nicodemus"]
      },
      selectedCipher: "cmcpss",
      selectedCCS: "ccsm",
      toEncrypt: "WE ARE DISCOVERED. FLEE AT ONCE",
      secretKey: "TOMATO",
      cipherKey: null,
      toDecrypt: null,
      excludedChar: [" ", ",", "."]
    };
  },
  methods: {
    encrypt() {
      if (this.selectedCipher === "ccp" || this.selectedCipher === "cmcpss") {
        switch (this.selectedCipher) {
          case "ccp":
            this.toDecrypt = this.myszkowski(this.toEncrypt, this.secretKey);
            break;
          case "cmcpss":
            break;
          default:
            break;
        }
      } else {
        switch (this.selectedCCS) {
          case "ccsm":
            break;
          case "ccsp":
            break;
          default:
            break;
        }
      }
    },
    decrypt() {
      if (this.selectedCipher === "ccp" || this.selectedCipher === "cmcpss") {
        switch (this.selectedCipher) {
          case "ccp":
            this.toEncrypt = this.myszkowskiDecrypt(
              this.toDecrypt,
              this.secretKey
            );
            break;
          case "cmcpss":
            break;
          default:
            break;
        }
      } else {
        switch (this.selectedCCS) {
          case "ccsm":
            break;
          case "ccsp":
            break;
          default:
            break;
        }
      }
    },
    closePopupAnyway() {
      const popupActive = document.querySelectorAll(".open")[0];
      if (popupActive) popupActive.classList.remove("open");
    },
    popupOpenInfo() {
      this.closePopupAnyway();
      const showP = document.querySelector("#popupInfo");
      showP.classList.add("open");
    },
    popupOpenUse() {
      this.closePopupAnyway();
      const showP = document.querySelector("#popupUse");
      showP.classList.add("open");
    },
    popupClose(popupActive) {
      popupActive.classList.remove("open");
    },
    myszkowski(text, key) {
      const str_arr = text.split("");
      const clear_str_arr = str_arr.filter(
        char => !this.excludedChar.includes(char)
      );
      const arr = [];

      const stringLength = clear_str_arr.length;
      const keyWidth = key.length;
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
      console.log(encryptedStr);
      return encryptedStr;
    },
    myszkowskiDecrypt(text, keyWord) {
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
        const haveUndefined = keyWord.indexOf(key) + 1 > undefinedCells;
        let howBigIam = howMuchOfMe + rows - 1;
        if (haveUndefined) howBigIam--;
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

      const correctPostitio = asciiFromZero;
      const correctSortedArr = [];
      for (let j = 0; j < correctPostitio.length; j++) {
        const index = correctPostitio[j];
        const row = arr[index];
        correctSortedArr.push(row);
      }

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
  }
};
</script>

<style>
#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
<style src="./main.css"></style>
<style src="./popup.css"></style>
