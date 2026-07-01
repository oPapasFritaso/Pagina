document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    console.log('Aplicación lista');
}

const display = document.getElementById('display');
const operation = document.getElementById('operation');

let resultDisplayed = false;

function appendValue(value) {
    if (resultDisplayed) {
        if (value === '/' || value === '*' || value === '-' || value === '+') {
            resultDisplayed = false;
        } else {
            display.value = "0";
            operation.textContent = ""; 
            resultDisplayed = false;
        }
    }

    if (display.value === "0" || display.value === "Error") {
        if (value !== '.') {
            display.value = value;
            return;
        }
    }
    display.value += value;
}

function clearDisplay() {
    display.value = "0";
    operation.textContent = "";
    resultDisplayed = false;
}

function calculate() {
    try {
        let expression = display.value;
        let originalExpression = expression;
        
        expression = expression.replace(/X/g, '*');
        
        let result = eval(expression);
        
        if (result !== undefined) {
            operation.textContent = originalExpression + " =";
            display.value = Math.round(result * 10000000) / 10000000;
            resultDisplayed = true;
        }
    } catch (error) {
        display.value = "Error";
        operation.textContent = "";
    }
}

function calculatePercentage() {
    try {
        let current = eval(display.value);
        operation.textContent = display.value + " % =";
        display.value = current / 100;
        resultDisplayed = true;
    } catch (error) {
        display.value = "Error";
        operation.textContent = "";
    }
}

function calculateSquareRoot() {
    try {
        let current = eval(display.value);
        if (current >= 0) {
            operation.textContent = "√(" + display.value + ") =";
            let root = Math.sqrt(current);
            display.value = Math.round(root * 10000000) / 10000000;
            resultDisplayed = true;
        } else {
            display.value = "Error";
            operation.textContent = "";
        }
    } catch (error) {
        display.value = "Error";
        operation.textContent = "";
    }
}