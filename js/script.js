const numberButtons = document.querySelectorAll(".number-button");
const decimalButton = document.querySelector("#decimal-button");
const signButton = document.querySelector("#sign-button");
const operatorButtons = document.querySelectorAll(".operator-button");
const equalButton = document.querySelector("#equal-button");
const clearButton = document.querySelector("#clear-button");
const display = document.querySelector("#display");

let currentOperator = "";
let isOperatorClicked = false;
let isOperatorChain = false;
let isEqualClicked = false;
let firstNumber = 0;
let operand = 0;
let zerothNumber = null;
let zerothOperator = null;

function add(a, b) { return Number(a) + Number(b);}

function subtract(a, b) { return Number(a) - Number(b);}

function multiply (a, b) {return Number(a) * Number(b);}

function divide (a, b) {return Number(a) / Number(b);}

function operate(a, b, operator) {
    if(operator == "+") 
        return add(a, b);
    else if(operator == "-") 
        return subtract(a, b);
    else if(operator == "×") 
        return multiply(a, b);
    else if(operator == "÷") 
        return divide(a, b);
}

function updateDisplay(str) {
    display.innerHTML = str;
}

numberButtons.forEach(button => {
    button.addEventListener("click", (e) => {
        const numberThatWasClicked = e.target.innerHTML;
        let currentNumberOnDisplay = display.innerHTML;
        if(isEqualClicked) {
            updateDisplay(numberThatWasClicked);
            firstNumber = display.innerHTML;
            currentOperator = "";
            isEqualClicked = false;
        }
        else if(isOperatorClicked) {
            firstNumber = display.innerHTML;
            updateDisplay(numberThatWasClicked);
            operand = numberThatWasClicked;
            isOperatorClicked = false;
        }
        else if(isOperatorChain && (currentNumberOnDisplay == "0" || currentNumberOnDisplay == "-0")) {
            operand = currentNumberOnDisplay.replace("0", numberThatWasClicked);
            updateDisplay(operand);
        }
        else if(currentNumberOnDisplay == "0" || currentNumberOnDisplay == "-0") {
            operand = currentNumberOnDisplay.replace("0", numberThatWasClicked);
            updateDisplay(operand);
            firstNumber = display.innerHTML;
        }
        else {
            operand = currentNumberOnDisplay + numberThatWasClicked;
            updateDisplay(operand);
        }
    });
});

decimalButton.addEventListener("click", () => {
    let currentNumberOnDisplay = display.innerHTML;
    if(isEqualClicked) {
        updateDisplay("0.");
        firstNumber = display.innerHTML;
        currentOperator = "";
        isEqualClicked = false;
    }
    else if(isOperatorClicked) {
        firstNumber = display.innerHTML;
        updateDisplay("0.");
        operand = "0.";
        isOperatorClicked = false;
    }
    else if(isOperatorChain && (currentNumberOnDisplay == "0" || currentNumberOnDisplay == "-0")) {
        operand = currentNumberOnDisplay + ".";
        updateDisplay(operand);
    }
    else if(currentNumberOnDisplay == "0" || currentNumberOnDisplay == "-0") {
        operand = currentNumberOnDisplay + ".";
        updateDisplay(operand);
        firstNumber = display.innerHTML;
    }
    else if(!currentNumberOnDisplay.includes(".")){
        operand = currentNumberOnDisplay + ".";
        updateDisplay(operand);
    }
});

signButton.addEventListener("click", () => {
    let currentNumberOnDisplay = display.innerHTML;
    if(isEqualClicked) {
        if(currentNumberOnDisplay.includes("-"))
            updateDisplay(currentNumberOnDisplay.replace("-",""));
        else
            updateDisplay("-" + currentNumberOnDisplay);
        firstNumber = display.innerHTML;
        currentOperator = "";
        isEqualClicked = false;
    }
    else if(isOperatorClicked) {
        firstNumber = display.innerHTML;
        updateDisplay("-0");
        operand = "-0";
        isOperatorClicked = false;
    }
    else if(currentNumberOnDisplay == "0") {
        operand = "-0";
        updateDisplay("-0");
    }
    else if(currentNumberOnDisplay == "-0") {
        operand = "0";
        updateDisplay("0");
    }
    else {
        if(currentNumberOnDisplay.includes("-"))
            operand = currentNumberOnDisplay.replace("-","");
        else
            operand = "-" + currentNumberOnDisplay;
        updateDisplay(operand);
    }
});

operatorButtons.forEach(button => {
    button.addEventListener("click", (e) => {        
        let lastOperator = currentOperator;
        currentOperator = e.target.innerHTML;
        if(!isEqualClicked && !isOperatorClicked) {
            if(((currentOperator == "+" || currentOperator == "-") && (lastOperator == "+" || lastOperator == "-"))
                    || ((currentOperator == "+" || currentOperator == "-") && (lastOperator == "×" || lastOperator == "÷"))) {
                firstNumber = operate(firstNumber, operand, lastOperator);
                if(zerothNumber !== null) {
                    if(zerothOperator == "-")
                        firstNumber = operate(zerothNumber, firstNumber, zerothOperator);
                    else
                        firstNumber = operate(firstNumber, zerothNumber, zerothOperator);
                    zerothNumber = null;
                    zerothOperator = null;
                }
                updateDisplay(firstNumber);
            }
            else if((currentOperator == "×" || currentOperator == "÷") && (lastOperator == "×" || lastOperator == "÷")) {
                firstNumber = operate(firstNumber, operand, lastOperator);
                updateDisplay(firstNumber);
            }
            else if((currentOperator == "×" || currentOperator == "÷") && (lastOperator == "+" || lastOperator == "-")) {
                zerothNumber = firstNumber;
                zerothOperator = lastOperator;
            
                firstNumber = display.innerHTML;
            }
        }
        operand = display.innerHTML;
        isOperatorClicked = true;
        isOperatorChain= true;
        isEqualClicked = false;
    });
});

equalButton.addEventListener("click", () => {
    let edgeCase = false;
    if(currentOperator == "")
        return;
    if(zerothNumber !== null) {
        if(isOperatorClicked) {
            firstNumber = operate(firstNumber, firstNumber, currentOperator);
            isOperatorClicked = false;
            edgeCase = true;
        }
        if(zerothOperator == "-")
            firstNumber = operate(zerothNumber, firstNumber, zerothOperator);
        else
            firstNumber = operate(firstNumber, zerothNumber, zerothOperator);
        zerothNumber = null;
        zerothOperator = null;
    }
    if(isOperatorClicked)
        firstNumber = operate(firstNumber, firstNumber, currentOperator);
    else if(!edgeCase)
        firstNumber = operate(firstNumber, operand, currentOperator);
    updateDisplay(firstNumber);
    isOperatorClicked = false;
    isOperatorChain = false;
    isEqualClicked = true;
});

clearButton.addEventListener("click", () => {
    currentOperator = "";
    isOperatorClicked = false;
    isOperatorChain = false;
    isEqualClicked = false;
    firstNumber = 0;
    operand = 0;
    zerothNumber = null;
    zerothOperator = null;
    updateDisplay(0);
})