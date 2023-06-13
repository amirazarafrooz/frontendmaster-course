let num1 = ""
let num2 = ""
let operator = ""

let isNum1 = true
let isNum2 = false

function calculate(num1,operator,num2) {
   if(operator ==="+") {
    return parseInt(num1) + parseInt(num2);
} else if (operator === "–") {
    return num1 - num2;
} else if (operator === "×") {
    return num1 * num2;
} else if (operator === "÷") {
    return num1 / num2;
} else {
    return 0
   }
}


const buttons = document.querySelectorAll("button")

for(let i = 0; i < buttons.length; i++) {
    
    buttons[i].addEventListener("click", (e) =>{
        readInput(e.target.innerHTML)
        
    }); 

}


function resetCalc() {
     num1 = ""
     num2 = ""
     operator = ""

     isNum1 = true
     isNum2 = false
}


function readInput(char) {

    let screen = document.querySelector(".screen")
    if (char === "=") {
        screen.innerHTML = calculate(num1,operator,num2)
        resetCalc();
        num1 = screen.innerHTML;

    } else if((char === "0"|| char === "1" || char === "2" ||
    char === "3"|| char === "4" || char === "5" ||
    char === "6"|| char === "7" || char === "8" ||
    char === "9") && isNum1 == true) {
        num1 += char
        screen.innerHTML = num1;

    } else if ((char === "0"|| char === "1" || char === "2" ||
    char === "3"|| char === "4" || char === "5" ||
    char === "6"|| char === "7" || char === "8" ||
    char === "9") && isNum1 == false) {
        num2 += char
        screen.innerHTML = num2

    } else if (char === "+" || char === "–" || char === "÷" || char === "×") {
        isNum1 = false
        operator = char
        screen.innerHTML = operator;
    } else if (char === "←" && isNum1 == true ) {
        num1 = num1.substring(0, num1.length - 1)
        screen.innerHTML = num1
    } else if (char === "←" && isNum1 == false ) {
        num2 = num2.substring(0, num2.length - 1)
        screen.innerHTML = num2
    } else if(char === "C") {
        resetCalc();
        screen.innerHTML = 0

    }



}