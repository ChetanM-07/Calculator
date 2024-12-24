// script.js
const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

let currentInput = '';
let previousInput = '';
let operator = '';

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const action = button.dataset.action;
        const value = button.textContent;

        if (!action) {
            currentInput += value;
            updateDisplay(currentInput);
        } else if (action === 'clear') {
            currentInput = '';
            previousInput = '';
            operator = '';
            updateDisplay('0');
        } else if (action === 'delete') {
            currentInput = currentInput.slice(0, -1);
            updateDisplay(currentInput || '0');
        } else if (action === 'percent') {
            currentInput = String(parseFloat(currentInput) / 100);
            updateDisplay(currentInput);
        } else if (['add', 'subtract', 'multiply', 'divide'].includes(action)) {
            if (currentInput) {
                previousInput = currentInput;
                currentInput = '';
                operator = action;
            }
        } else if (action === 'equals') {
            if (currentInput && previousInput && operator) {
                currentInput = calculate(previousInput, currentInput, operator);
                updateDisplay(currentInput);
                previousInput = '';
                operator = '';
            }
        }
    });
});

function updateDisplay(value) {
    display.textContent = value;
}

function calculate(a, b, operator) {
    a = parseFloat(a);
    b = parseFloat(b);

    switch (operator) {
        case 'add':
            return a + b;
        case 'subtract':
            return a - b;
        case 'multiply':
            return a * b;
        case 'divide':
            return a / b;
        default:
            return b;
    }
}