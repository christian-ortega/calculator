const numberButtons = document.querySelectorAll(".number-button");
const operatorButtons = document.querySelectorAll(".operator-button");
const equalButton = document.querySelector("#equal-button");
const clearButton = document.querySelector("#clear-button");
const display = document.querySelector("#display");

let currentOperator = "";
let isOperatorClicked = false;
let firstNumber = 0;

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
        if(isOperatorClicked) {
            firstNumber = display.innerHTML;
            updateDisplay(numberThatWasClicked);
            isOperatorClicked = false;
        }
        else if(currentNumberOnDisplay == "0")
            updateDisplay(numberThatWasClicked);
        else {
            updateDisplay(currentNumberOnDisplay + numberThatWasClicked);
        }
    });
});

operatorButtons.forEach(button => {
    button.addEventListener("click", (e) => {
        currentOperator = e.target.innerHTML;
        isOperatorClicked = true;
    });
});

equalButton.addEventListener("click", () => {
    updateDisplay(operate(firstNumber, display.innerHTML, currentOperator));
});

clearButton.addEventListener("click", () => {
    currentOperator = "";
    isOperatorClicked = false;
    firstNumber = 0;
    updateDisplay(0);
})