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
        <button
          v-if="!notRealised.includes(selectedCipher)"
          @click="popupOpenUse"
          class="popup-link"
        >
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
        <div class="popup__text" v-html="objectToShow?.description"></div>
        <button
          v-if="!notRealised.includes(selectedCipher)"
          @click="popupOpenUse"
          class="popup-link"
        >
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
import { DESCRIPTIONS } from "../ciphers/content_info";
import { myszkowski, myszkowskiDecrypt } from "../ciphers/transposition.js";
import {
  nihilist,
  nihilistDecrypt
} from "../ciphers/monoalphabeticSubstitution.js";
import {
  playfair,
  playfairDecrypt
} from "../ciphers/polialphabeticSubstitution.js";
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
      DESCRIPTIONS: new Array(...DESCRIPTIONS),
      objectToShow: {},
      descriptionToShow: "",
      notRealised: ["cmcpss"],
      selectedCipher: "ccp",
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
      if (this.selectedCipher !== "ccs") {
        switch (this.selectedCipher) {
          case "ccp":
            this.toDecrypt = myszkowski(this.toEncrypt, this.secretKey);
            break;
          case "cmcpss":
            break;
          default:
            break;
        }
      } else {
        switch (this.selectedCCS) {
          case "ccsm":
            this.toDecrypt = nihilist(this.toEncrypt, this.secretKey);
            break;
          case "ccsp":
            this.toDecrypt = playfair(this.toEncrypt, this.secretKey);
            break;
          default:
            break;
        }
      }
    },
    decrypt() {
      if (this.selectedCipher !== "ccs") {
        switch (this.selectedCipher) {
          case "ccp":
            this.toEncrypt = myszkowskiDecrypt(this.toDecrypt, this.secretKey);
            break;
          case "cmcpss":
            break;
          default:
            break;
        }
      } else {
        switch (this.selectedCCS) {
          case "ccsm":
            this.toEncrypt = nihilistDecrypt(this.toDecrypt, this.secretKey);
            break;
          case "ccsp":
            this.toEncrypt = playfairDecrypt(this.toDecrypt, this.secretKey);
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
      this.objectToShow =
        this.selectedCipher == "ccs"
          ? this.DESCRIPTIONS.filter(e => e.key == this.selectedCCS)[0]
          : this.DESCRIPTIONS.filter(e => e.key == this.selectedCipher)[0];
    },
    popupOpenUse() {
      this.closePopupAnyway();
      const showP = document.querySelector("#popupUse");
      showP.classList.add("open");
    },
    popupClose(popupActive) {
      popupActive.classList.remove("open");
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
