const resultElement = document.getElementById("result");
const lengthElement = document.getElementById("length");
const upperCaseElement = document.getElementById("uppercase");
const lowerCaseElement = document.getElementById("lowercase");
const numberElement = document.getElementById("numbers");
const characterElement = document.getElementById("specialcharacters");
const generateElement = document.getElementById("generate");
const clipboardElement = document.getElementById("clipboard");

const randomFunction = {
  lower: getRandomLower,
  upper: getRandomUpper,
  number: getRandomNumber,
  character: getRandomCharacter,
};

clipboardElement.addEventListener("click", () => {
  const textarea = document.createElement("textarea");
  const password = resultElement.innerText;

  if (!password) {
    return;
  }
  textarea.value = password;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
  alert("Password copied successfully");
});

generateElement.addEventListener("click", () => {
  const length = +lengthElement.value;
  const hasLower = lowerCaseElement.checked;
  const hasUpper = upperCaseElement.checked;
  const hasNumber = numberElement.checked;
  const hasCharacter = characterElement.checked;

  resultElement.innerText = generatePassword(
    hasLower,
    hasUpper,
    hasNumber,
    hasCharacter,
    length
  );
});

function generatePassword(lower, upper, number, character, length) {
  let generatedPassword = "";
  const typesCount = lower + upper + number + character;
  const typesArray = [{ lower }, { upper }, { number }, { character }].filter(
    (item) => Object.values(item)[0]
  );

  if (typesCount === 0) {
    return "";
  }

  for (let i = 0; i < length; i += typesCount) {
    typesArray.forEach((type) => {
      const funcName = Object.keys(type)[0];
      generatedPassword += randomFunction[funcName]();
    });
  }
  const finalPassword = generatedPassword.slice(0, length);
  return finalPassword;
}

function getRandomLower() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomCharacter() {
  const character = '~!@#$%^&*()_-+={[}]|:;"<,>.?/';
  return character[Math.floor(Math.random() * character.length)];
}
