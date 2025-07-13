"use strict";

function log(func) {console.log(func);} // DEBUGGER GOATED

const screen = document.querySelector('.screen');
const oneBtn = document.querySelector('#one');
const twoBtn = document.querySelector('#two');
const threeBtn = document.querySelector('#three');
const fourBtn = document.querySelector('#four');
const fiveBtn = document.querySelector('#five');
const sixBtn = document.querySelector('#six');
const sevenBtn = document.querySelector('#seven');
const eightBtn = document.querySelector('#eight');
const nineBtn = document.querySelector('#nine');
const zeroBtn = document.querySelector('#zero');
const addSign = document.querySelector('#add');
const minusSign = document.querySelector('#subtract');
const multiplySign = document.querySelector('#multiply');
const divideSign = document.querySelector('#divide');
const clear = document.querySelector('.clear');
const equals = document.querySelector('.equalsTo');


// STATE VARIABLES 
let currentValue = '';
let operatorUsed = null;
let shouldResetScreen = false; 

// MATH & OPERATE FUNCTIONS 
function addition(a, b) { return (a + b); }
function subtraction(a, b) { return (a - b); }
function multiply(a, b) {
    return Math.round(((a * b) * 1000)) / 1000;
}
function division(a, b) {
    if (b == 0) { return `ERROR`; }
    return Math.round(((a / b) * 1000)) / 1000;
}

function operate(operator, a, b) {
    let currentValidatedValue = Number(a);
    let nextValidatedValue = Number(b);
    if (operator == '+') { return addition(currentValidatedValue, nextValidatedValue); }
    else if (operator == '-') { return subtraction(currentValidatedValue, nextValidatedValue); }
    else if (operator == 'x') { return multiply(currentValidatedValue, nextValidatedValue); } // Use 'x' to match button
    else if (operator == '/') { return division(currentValidatedValue, nextValidatedValue); }
    else { return `ERROR`; }
}

//  EVENT LISTENERS

// Function to handle number clicks
function appendNumber(number) {
    if (shouldResetScreen) {
        screen.textContent = '';
        shouldResetScreen = false;
    }
    screen.textContent += number;
}

// Function to handle operator clicks
function setOperator(operator) {
    // AI MADE ----> If an operator is already waiting, we calculate the first pair.
    if (operatorUsed !== null) {
        callOperate()
    }
    currentValue = screen.textContent;
    operatorUsed = operator;
    shouldResetScreen = true; // Tell the calculator to clear the screen for the next number.
}

// A function to call operate, used by '=' and operator chaining
function callOperate() {
    // AI MADE ---> If we don't have an operator, we can't do anything.
    if (operatorUsed === null || shouldResetScreen) return;

    let nextValue = screen.textContent;
    const result = operate(operatorUsed, currentValue, nextValue);
    
    // Display the result or the error message from the division function
    screen.textContent = result;
    
    // If there was an error, reset everything
    if (result === 'ERROR') {
        currentValue = '';
        operatorUsed = null;
    } else {
        currentValue = result;
        operatorUsed = null; 
    }
    shouldResetScreen = true;
}

// Functions to buttons
oneBtn.addEventListener('click', () => appendNumber('1'));
twoBtn.addEventListener('click', () => appendNumber('2'));
threeBtn.addEventListener('click', () => appendNumber('3'));
fourBtn.addEventListener('click', () => appendNumber('4'));
fiveBtn.addEventListener('click', () => appendNumber('5'));
sixBtn.addEventListener('click', () => appendNumber('6'));
sevenBtn.addEventListener('click', () => appendNumber('7'));
eightBtn.addEventListener('click', () => appendNumber('8'));
nineBtn.addEventListener('click', () => appendNumber('9'));
zeroBtn.addEventListener('click', () => appendNumber('0'));

addSign.addEventListener('click', () => setOperator('+'));
minusSign.addEventListener('click', () => setOperator('-'));
multiplySign.addEventListener('click', () => setOperator('x'));
divideSign.addEventListener('click', () => setOperator('/'));

equals.addEventListener('click', callOperate);

clear.addEventListener('click', () => {
    screen.textContent = '';
    currentValue = '';
    operatorUsed = null;
    shouldResetScreen = false;
});