class CalculatorToolkit {
    constructor() {
        this.operationMap = new Map();
        this.operationMap.set("/", this.divide);
        this.operationMap.set("*", this.multiply);
        this.operationMap.set("+", this.add);
        this.operationMap.set("-", this.subtract);
    }

    add(a, b) {
        return a + b;
    }

    subtract(a, b) {
        return a - b;
    }

    divide(a, b) {
        return a / b;
    }

    multiply(a, b) {
        return a * b;
    }
}

class CalculatorStatehandler {
    constructor() {
        this.calculatorToolkit = new CalculatorToolkit();
        this.operands = [];
        this.currentOperandIndex = 0;
        this.operation = "";
        this.result = 0.0;
    }

    get getOperation() {
        return this.operation;
    }
    set setOperation(value) {
        this.operation = value;
    }

    get getOperand() {
        return this.operands[this.currentOperandIndex];
    }
    set setOperand(newOperand) {
        this.operands[this.currentOperandIndex] = newOperand;
        this.currentOperandIndex++;
    }

    resetstate() {
        this.operands = [];
        this.currentOperandIndex = 0;
        this.operation = "";
        this.result = 0.0;
    }

    calcResult() {
        this.result = this.calculatorToolkit.operationMap.get(this.operation)(this.operands[0], this.operands[1]);
        return this.result;
    }
}

class CalculatorIODevice {
    constructor() {
        this.calculatorStatehandler = new CalculatorStatehandler();
        this.inputstrings = ["",""];
        this.currentInputstringIndex = 0;
        this.outputresultstring = "";
    }

    clickInput(input) {
        if(isNaN(parseFloat(input))) {
            if(input == "=") {
                this.calculatorStatehandler.setOperand = parseFloat(this.inputstrings[this.currentInputstringIndex]);
                this.outputresultstring = this.calculatorStatehandler.calcResult();
                this.refreshOutputfield();
            }
            else if(input == ",") {
                const inputstringHasPoint = (this.inputstrings[this.currentInputstringIndex].indexOf(".") > -1);
                if(!inputstringHasPoint) {
                    this.inputstrings[this.currentInputstringIndex] += ".";
                    this.refreshOutputfield();
                }
            }
            else if(["/","*","+","-"].indexOf(input) > -1 ) {
                this.calculatorStatehandler.setOperation = input;
                this.calculatorStatehandler.setOperand = parseFloat(this.inputstrings[this.currentInputstringIndex]);
                this.currentInputstringIndex++;
                this.refreshOutputfield();
            }
            else {
                alert("What are you trying to achieve?");
            }
        }
        else {
            this.inputstrings[this.currentInputstringIndex] += input;
            this.refreshOutputfield();
        }
    }

    clickClear() {
        this.inputstrings = ["",""];
        this.currentInputstringIndex = 0;
        this.outputresultstring = "";
        this.calculatorStatehandler.resetstate();
        this.refreshOutputfield();
    }

    refreshOutputfield() {
        let newOutput = "";

        if(this.inputstrings[0] !== "") {
            newOutput += this.inputstrings[0];
        }
        if(this.calculatorStatehandler.getOperation !== "") {
            newOutput += this.calculatorStatehandler.getOperation;
        }
        if(this.inputstrings[1] !== "") {
            newOutput += this.inputstrings[1];
        }
        if(this.outputresultstring !== "") {
            newOutput += "=" + this.outputresultstring;
        }

        document.querySelector("p.outputfield").innerHTML = newOutput;
    }
}

const calculatorIODevice = new CalculatorIODevice();