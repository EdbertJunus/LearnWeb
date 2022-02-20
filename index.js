const button = document.querySelectorAll(".col");
const display = document.querySelector(".view-screen");
const calculation = {
  "+": (x, y) => {
    return x + y;
  },
  "-": (x, y) => {
    return x - y;
  },
  "×": (x, y) => {
    return x * y;
  },
  "÷": (x, y) => {
    return x / y;
  },
};

let calculationFlag = 0; //Boolean for ongoing operation
let currentOperation; //Keep track ongoing operation
let currentTotal; //Keep track of total of the value in operation
let previousScreen; //Keep track of the input value

function handleCalculation(oldTotal, newValue, operation) {
  let result = calculation[operation.toString()](oldTotal, newValue);
  return result;
}

function handleInput(input) {
  let screen = display.innerHTML;
  const notNum = isNaN(Number(input));
  const checkOperator = input.toString() in calculation;
  const newNum = screen == 0 ? input : screen + input;
  let newInput = notNum ? 0 : newNum; //Screen Number

  //Keep track of previous input value
  previousScreen = !notNum ? newNum : previousScreen;

  //Check if not Number and no ongoing operation
  if (notNum && calculationFlag === 0) {
    //Not mathematical Operator
    if (!checkOperator) {
      switch (input) {
        case "C":
          newInput = 0;
          currentTotal = 0;
          calculationFlag = 0;
          previousScreen = 0;
          break;
        case "=":
          newInput = screen;
          break;
        case "←":
          if (newNum.slice(0, -1).length == 1 || screen == 0) {
            newInput = 0;
          } else {
            newInput = newNum.slice(0, -2);
          }
          previousScreen = newInput;
          break;
      }
    } else {
      currentOperation = input;
      calculationFlag = 1;
      currentTotal = previousScreen;
    }
  }
  //When input '=' and there is ongoing operation
  if (calculationFlag === 1 && input == "=") {
    let calculationResult = handleCalculation(
      parseInt(currentTotal),
      parseInt(previousScreen),
      currentOperation
    );
    currentTotal = calculationResult;
    calculationFlag = 0; //Reset to no ongoing operation
    newInput = currentTotal; // New Input
    previousScreen = currentTotal; //Previous Screen incase continue counting
  }
  //Show in screen
  display.innerHTML = newInput;
}

for (let index = 0; index < button.length; index++) {
  button[index].addEventListener("click", function (e) {
    handleInput(e.target.innerText);
  });
}
