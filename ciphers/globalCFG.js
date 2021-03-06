export const EXCLUDED_CHAR = [" ", ",", "."];

export const ALPHABET = "abcdefghiklmnopqrstuvwxyz".toUpperCase().split("");

export const RARE_CHAR = "Z";
// todo RARE_CHAR <- input by user; is used in polialphabetic substitunion

export const WIDTH = 5;

// never used
export const convertJtoI = str => {
  return [...str].map(char =>
    char === "J" || char === "j" ? (char = "I") : char.toUpperCase()
  );
};
