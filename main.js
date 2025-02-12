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


let screenTop = document.querySelector(".screenTop");
let screenBottom = document.querySelector(".screenBottom");
let memory = [];
let temporaryMemory = [];

document.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
        if (button.textContent === "=") {
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
        } else if (button.textContent === "C") {
            clearScreen();
            memory = [];
            temporaryMemory = [];
        } else if (checkOperator(screenBottom.textContent.slice(-1), button.textContent)) {
            screenBottom.textContent = screenBottom.textContent.slice(0, -1) + button.textContent;
            memory.pop();
            memory.push(button.textContent);
        } else {
            screenBottom.textContent += button.textContent
            if (memory.length == 0 && temporaryMemory.length == 0 && (button.textContent === "+" || button.textContent === "x" || button.textContent === "/")) {
                
            } else if (memory.length == 0 && temporaryMemory.length == 0 && button.textContent === "-") {
                temporaryMemory.push(button.textContent)
            } else if ((button.textContent === "+" || button.textContent === "-" || button.textContent === "x" || button.textContent === "/")) {
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
