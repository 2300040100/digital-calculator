let display = document.getElementById("display");

// Append value at cursor position
function appendValue(value) {
    let cursorPos = display.selectionStart;
    let textBefore = display.value.substring(0, cursorPos);
    let textAfter = display.value.substring(cursorPos); 

    display.value = textBefore + value + textAfter;
    display.selectionStart = display.selectionEnd = cursorPos + value.length;
}

// Clear display
function clearDisplay() {
    display.value = "";
}

// Backspace function (Delete at cursor)
function backspace() {
    let cursorPos = display.selectionStart;
    if (cursorPos > 0) {
        let textBefore = display.value.substring(0, cursorPos - 1);
        let textAfter = display.value.substring(cursorPos);

        display.value = textBefore + textAfter; 
        display.selectionStart = display.selectionEnd = cursorPos - 1;
    }
}

// Handle keyboard input
document.addEventListener("keydown", (event) => {
    const key = event.key;

    // Prevent double inputs by checking if user typed manually
    if (document.activeElement === display) return;

    // Allow numbers and operators but prevent duplicate operators
    if (!isNaN(key) || "+-*/.".includes(key)) {
        let lastChar = display.value.slice(-1);
        if ("+-*/.".includes(lastChar) && "+-*/.".includes(key)) return; // Prevent duplicate operators
        appendValue(key);
    } else if (key === "Enter") {
        calculateResult();
    } else if (key === "Backspace") {
        backspace();
    } else if (key === "Escape") {
        clearDisplay();
    } else if (key === "h" || key === "H") { 
        let history = document.getElementById("history");
        if (history) {
            history.style.display = (history.style.display === "none") ? "block" : "none";
        }
    }
});

// Handle function buttons (sin, cos, etc.)
function appendFunction(func) {
    if (func === "pi") {
        appendValue(Math.PI.toFixed(6));
    } else if (func === "e") {
        appendValue(Math.E.toFixed(6));
    } else {
        appendValue(func + "(");
    }
}

// Toggle between open/close brackets
let isOpenBracket = true;
function toggleBrackets() {
    appendValue(isOpenBracket ? "(" : ")");
    isOpenBracket = !isOpenBracket;
}

// Calculate result
function calculateResult() {
    try {
        let expression = display.value
            .replace(/sin\(/g, "Math.sin(")
            .replace(/cos\(/g, "Math.cos(")
            .replace(/tan\(/g, "Math.tan(")
            .replace(/sqrt\(/g, "Math.sqrt(")
            .replace(/π/g, "Math.PI")
            .replace(/e/g, "Math.E");

        let result = eval(expression);
        let history = document.getElementById("history");
        history.innerHTML += `<p>${display.value} = <strong>${result}</strong></p>`;
        display.value = result;
    } catch {
        display.value = "Error";
    }
}

// Toggle Dark Mode
const themeToggle = document.getElementById("theme-toggle");
const body = document.body;
const calculator = document.querySelector(".calculator");

themeToggle.addEventListener("click", ()=>{
    body.classList.toggle("dark-mode");
    if(body.classList.contains("dark-mode")){
        body.style.backgroundColor = "#1e1e1e";
        calculator.style.backgroundColor = "#e0e0e0";
        calculator.style.color = "#000";
        themeToggle.textContent = "🤍";
    }else{
        body.style.backgroundColor = "#ffffff";
        calculator.style.backgroundColor = "#222";
        calculator.style.color = "#fff";
        themeToggle.textContent = "🖤"; 
    }
});

// Enable cursor insertion in input field
display.addEventListener("click", function () {
    this.focus();
});





