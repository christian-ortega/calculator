const numberButtons = document.querySelectorAll(".number-button");
const display = document.querySelector("#display");

function add(a, b) { return a + b;}

function subtract(a, b) { return a - b;}

function multiply (a, b) {return a * b;}

function divide (a, b) {return a / b;}

function operate(a, b, operator) {
    if(operator == "add") 
        return add(a, b);
    else if(operator == "subtract") 
        return subtract(a, b);
    else if(operator == "multiply") 
        return multiply(a, b);
    else if(operator == "divide") 
        return divide(a, b);
}

numberButtons.forEach(button => {
    button.addEventListener("click", (e) => {
        const numberThatWasClicked = e.target.innerHTML;
        let currentNumberOnDisplay = display.innerHTML;
        if(currentNumberOnDisplay == "0")
            display.innerHTML = numberThatWasClicked;
        else {
            display.innerHTML = currentNumberOnDisplay + numberThatWasClicked;
        }
    });
});