function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(operator, a, b) {
    switch (operator) {
        case "+":
        return add(a, b);
        case "-":
        return subtract(a, b);
        case "*":
        return multiply(a, b);
        case "/":
        return divide(a, b);
    }
}

function equal() {
    if (temporaryMemory.length != 0){
        number = parseFloat(temporaryMemory.join(""));
        memory.push(number);
    } else if (memory.at(-1) == "+" || memory.at(-1) == "-" || memory.at(-1) == "x" || memory.at(-1) == "/") {
        memory.pop()
    }
    if (memory.length != 0) {
        screenBottom.textContent = Math.round(calculateMemory(memory) * 1000) / 1000;
    }
    temporaryMemory = []
    memory = []
    temporaryMemory.push(screenBottom.textContent);
    screenTop.textContent = screenBottom.textContent;
}

function calculateMemory(memory) {;
    let result = memory[0];
    for (let i = 1; i < memory.length; i++) {
        if (memory[i] === "+") {
            result = operate("+", result, memory[i + 1]);
        } else if (memory[i] === "-") {
            result = operate("-", result, memory[i + 1]);
        } else if (memory[i] === "x") {
            result = operate("*", result, memory[i + 1]);
        } else if (memory[i] === "/") {
            result = operate("/", result, memory[i + 1]);
        }
    }
    return result;
}

function clearScreen() {
    screenTop.textContent = "";
    screenBottom.textContent = "";
    memory = []
    temporaryMemory = []
}

function checkOperator(lastScreenBottom, button) {
    if ((lastScreenBottom === "+" || lastScreenBottom === "-" || lastScreenBottom === "x" || lastScreenBottom === "/")
        &&
        (button === "+" || button === "-" || button === "x" || button === "/")) {
        return true;
    } else {
        return false;
    }
}

function changeLastOperator(keyButton){
    screenBottom.textContent = screenBottom.textContent.slice(0, -1) + keyButton;
            memory.pop();
            memory.push(keyButton);
}

function keyboardListener() {
    document.addEventListener('keydown', (event) => {
        console.log("You pressed: " + event.key);
        key = event.key
        if (key === "=" || key === "Enter"){
            equal()
        } else if (key === "c"){
            clearScreen()
        } else if (checkOperator(screenBottom.textContent.slice(-1), key)) {
            changeLastOperator(key)
        } else if (!isNaN(parseFloat(key)) || key == "x" || key == "*"  || key == "/" || key == "+" || key == "-") {
            screenBottom.textContent += key;
            if (memory.length == 0 && temporaryMemory.length == 0 && (key === "+" || key === "x" || key === "*" || key === "/")) {
                changeLastOperator(key)
            } else if (memory.length == 0 && temporaryMemory.length == 0 && key === "-"){
                temporaryMemory.push(key)
            } else if (key === "+" || key === "-" || key === "x" || key === "/"){
                if (temporaryMemory.length != 0){
                    number = parseFloat(temporaryMemory.join(""));
                    memory.push(number);
                }
                temporaryMemory = [];
                memory.push(key)
            } else {
                temporaryMemory.push(key)
            }
        }
    });
}

let screenTop = document.querySelector(".screenTop");
let screenBottom = document.querySelector(".screenBottom");
let memory = [];
let temporaryMemory = [];

document.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
        if (button.textContent === "=") {
            equal()
        } else if (button.textContent === "C") {
            clearScreen();
        } else if (checkOperator(screenBottom.textContent.slice(-1), button.textContent)) {
            changeLastOperator(button.textContent)
        } else {
            screenBottom.textContent += button.textContent
            if (memory.length == 0 && temporaryMemory.length == 0 && (button.textContent === "+" || button.textContent === "x" || button.textContent === "/")) {
                changeLastOperator(button.textContent)
            } else if (memory.length == 0 && temporaryMemory.length == 0 && button.textContent === "-") {
                temporaryMemory.push(button.textContent)
            } else if (button.textContent === "+" || button.textContent === "-" || button.textContent === "x" || button.textContent === "/") {
                if (temporaryMemory.length != 0){
                    number = parseFloat(temporaryMemory.join(""));
                    memory.push(number);
                }
                temporaryMemory = [];
                memory.push(button.textContent)
            } else {
                temporaryMemory.push(button.textContent)
            }
        }
        console.log("Temporary Memory: " + temporaryMemory);
        console.log("Memory: " + memory);
    });
});

keyboardListener()