const add = function(a, b) {
    return a + b;
}

const subtract = function(a, b) {
    return a - b;
}

const divide = function(a, b) {
    return a / b;
}

const multiply = function(a, b) {
    return a * b;
}



let inputNumbers = ["",""];
let currentInputNumber = 0;
let chosenOperationSymbol = "";
let chosenOperationFunction = add;
let outputresult = "";


function calcResult() {
    return chosenOperationFunction(parseFloat(inputNumbers[0]), parseFloat(inputNumbers[1]));
}

function refreshOutputfield() {
    let newOutput = "";
    if(inputNumbers[0] !== "") {
        if(inputNumbers[1] !== "") {
            if(outputresult !== "") {
                newOutput = inputNumbers[0] + chosenOperationSymbol + inputNumbers[1] + "=" + outputresult;
            }
            else {
                newOutput = inputNumbers[0] + chosenOperationSymbol + inputNumbers[1];
            }
        }
        else {
            newOutput = inputNumbers[0] + chosenOperationSymbol;
        }
    }
    document.querySelector("p.outputfield").innerHTML = newOutput;
}

function clickInput(input) {
    if(isNaN(parseInt(input))) {
        if(input == "=") {
            outputresult = calcResult();
            refreshOutputfield();
        }
        else if(input == ",") {
            inputNumbers[currentInputNumber] += ".";
        }
        else if(["/","*","+","-"].indexOf(input) > -1 ) {
            switch(input) {
                case "/": 
                    chosenOperationFunction = divide;
                    break;
                case "*": 
                    chosenOperationFunction = multiply;
                    break;
                case "+": 
                    chosenOperationFunction = add;
                    break;
                case "-": 
                    chosenOperationFunction = subtract;
                    break;
                default:
                    alert("What are you trying to achieve?");
            }
            currentInputNumber = 1;
            chosenOperationSymbol = input;
            refreshOutputfield();
        }
        else {
            alert("What are you trying to achieve?");
        }
    }
    else {
        inputNumbers[currentInputNumber] += input;
        refreshOutputfield();
    }
}

function clickClear() {
    inputNumbers = ["",""];
    currentInputNumber = 0;
    chosenOperationFunction = add;
    chosenOperationSymbol = "";
    outputresult = "";
    refreshOutputfield();
}