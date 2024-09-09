const calculatorDisplay = document.querySelector("h1");
const inputBtn = document.querySelectorAll('button');
const clearBtn = document.getElementById('clear-btn');
const deleteBtn = document.querySelector('.delete');

const calculate = {
    "/":(fistNumber,secondNumber)=>secondNumber != "0" ? fistNumber/secondNumber : "0",
    "*":(fistNumber,secondNumber)=>fistNumber*secondNumber,
    "+":(fistNumber,secondNumber)=>fistNumber+secondNumber,
    "-":(fistNumber,secondNumber)=>fistNumber-secondNumber,
    "=":(fistNumber,secondNumber)=>secondNumber,
}

let fistValue = 0;
let operatorValue = "";
let waitForNext = false;

function calOperan(operatorr){
    const currentValue = Number(calculatorDisplay.textContent);
    if(operatorValue && waitForNext){
        operatorValue = operatorr;
        return;
    }
    if(!fistValue){
        fistValue = currentValue;
    }
    else {
        const result = calculate[operatorValue](fistValue,currentValue);
        calculatorDisplay.textContent=result;
        fistValue=result;
    }
    operatorValue = operatorr;
    waitForNext = true;
    console.log(operatorValue);
}

function setNumber(number){
   if(waitForNext){
    calculatorDisplay.textContent = number;
    waitForNext = false;
   }
   else {
    const displayValue = calculatorDisplay.textContent;
    calculatorDisplay.textContent = displayValue === "0" ? number : displayValue + number;
    if(fistValue === "0") {
        clear();
    }
   }
}


function addDecimal(){
        if(waitForNext) return;
        if(!calculatorDisplay.textContent.includes(".")){
            calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
        }
    
}

inputBtn.forEach((input)=>{
    if(input.classList.length === 0) {
        input.addEventListener("click",()=>setNumber(input.value));
    }
    else if(input.classList.contains('operator')) {
        input.addEventListener("click",()=> calOperan(input.value));
    }
    else if(input.classList.contains('decimal')) {
        input.addEventListener("click",()=>addDecimal());
    }
});

function clear(){
    clearBtn.addEventListener("click",function(){
        calculatorDisplay.textContent = "0";
    });
};
clear();

deleteBtn.addEventListener('click',function(){
    let display = calculatorDisplay.textContent;
        display = display.slice(0,-1);
        calculatorDisplay.textContent = display;
        if(display.length < 1) {
            calculatorDisplay.textContent = "0"
        }
        console.log(display);
});
        

