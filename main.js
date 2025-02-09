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

screenTop = document.querySelector(".screenTop");
screenBottom = document.querySelector(".screenBottom");

document.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
        if (button.textContent === "=") {

           screenTop.textContent = screenBottom.textContent;
        } else if (button.textContent === "C") {
            screenTop.textContent = "";
            screenBottom.textContent = "";
        } else {
            screenBottom.textContent += button.textContent
        }
    });
});
