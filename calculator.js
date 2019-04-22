const calculatorID = 'calculator';
const displayClass = 'display';
const numberClass = 'number';
const operationsClass = 'operations';
const OPER = ['AC','+/-','%','/','X','-','+','='];

var operations = ['AC','+/-','%','/','X','-','+','='];
var numbers = ['7','8','9','4','5','6','1','2','3','0','.'];

var calculationStack = [];

var firstDisplayValue = false;
var firstOperatorPressed = false;
var equalOperator = false;

calculatorElement = document.getElementById(calculatorID);
 
//create display element
var displayElement = document.createElement('DIV');
displayElement.setAttribute('class',displayClass);
displayElement.setAttribute('id',displayClass);
// initialize display to 0
displayElement.innerText = '0';

calculatorElement.appendChild(displayElement);

//attach calculator body
var bodyElement = document.createElement('DIV');
bodyElement.setAttribute('class','body');
bodyElement.setAttribute('id','body');

function calculation(num1,num2,oper){
    switch(oper){
        case '/':
            return num1/num2;
        case 'X':
            return num1*num2;
        case '-':
            return num1-num2;
        case '+':
            return num1+num2;
    }
}

function numberClicked(e) {
    //base your logic on both the target charater and the display character
    var displayInstance = document.getElementById(displayClass);
    var displayValue = displayInstance.innerText;
    
    if(firstDisplayValue == true){
         //reset display first number has been captured. need to display and accumulate second number
        displayElement.innerText = '';
        displayElement.innerText = e.target.innerText;
        console.log('display should have been reset');
        // reset firstDisplayValue back to false to make use of old logic
        firstDisplayValue = false;
        firstOperatorPressed = false; //number has accumulated and new operation can take place
    }// this branch is taken only at initialization or after firstDisplayValue is reset to false by an operator click
    else {
        if(displayValue.length>=9){
            // display is full do not add  any new number to display
            // need to exclude . as a number
        }
        else if(displayElement.innerText[0]=='0' && displayElement.innerText.length==1 ){
        //replace 0 display with number
            if(e.target.innerText=='.'){
                displayElement.innerText = displayElement.innerText + e.target.innerText;
            }
            else {
                displayElement.innerText =  e.target.innerText;
            }
        }
        else if(e.target.innerText =='.' && displayValue.includes('.') ){
        // do nothing period already added
        }
        else{
        //add number to display
            displayElement.innerText = displayValue + e.target.innerText;
        }

        }
    }// end of numberClicked fcn

function operationClicked(e){
    switch(e.target.innerText){
        case 'AC':
            //reset display
            displayElement.innerText='0';
            // reset all boolean values and calculationStack
            firstDisplayValue = false;
            firstOperatorPressed = false;
            equalOperator = false;
            calculationStack = [];
            break;
        case '+/-':
            // toggle between negative and positive
            if(displayElement.innerText[0]=='0' && displayElement.innerHTML.length==1){
                //do nothing display is 0
            }
            else if(displayElement.innerText.includes('-') ){
                // removes negative sign
                displayElement.innerText = displayElement.innerText.slice(1,);
            }
            else{
                // appends negative sign to string
                displayElement.innerText = '-'+displayElement.innerText;
            }
            break;
        case '%':
            if(displayElement.innerText[0]=='0' && displayElement.innerHTML.length==1){
            //do nothing display is 0
            }
            else{
                var temp = Number(displayElement.innerText);
                temp/=100;
                // create a function to format string assigned to displayElement.innerText
                displayElement.innerText = temp;
            }
            break;
        case '/':
            // number to be operated on is final once an operator is clicked so add it to calculationStack
            if(firstOperatorPressed == false){
                calculationStack.push(displayElement.innerText);
                calculationStack.push('/');

                firstOperatorPressed = true;
                firstDisplayValue = true;
                // display must update after the first operator press to display second number
                if(calculationStack.length>=3){
                    var num1 = Number(calculationStack.shift());
                    var oper = calculationStack.shift();
                    var num2 = Number(calculationStack.shift());
                    var calculatedNumber = calculation(num1,num2,oper);
                    
                    calculationStack.unshift(calculatedNumber);
                    displayElement.innerText = calculatedNumber.toString();
                }
            }
            else if(firstOperatorPressed == true ){
                // waiting for a new number to accumulate
                // firstOperatorPressed must be set to false in the numberClicked function
            }
            
            break;
        case 'X':
            // number to be operated on is final once an operator is clicked so add it to calculationStack
            if(firstOperatorPressed == false){
                calculationStack.push(displayElement.innerText);
                calculationStack.push('X');

                firstOperatorPressed = true;
                firstDisplayValue = true;
                // display must update after the first operator press to display second number
                if(calculationStack.length>=3){
                    var num1 = Number(calculationStack.shift());
                    var oper = calculationStack.shift();
                    var num2 = Number(calculationStack.shift());
                    var calculatedNumber = calculation(num1,num2,oper);
                    
                    calculationStack.unshift(calculatedNumber);
                    displayElement.innerText = calculatedNumber.toString();
                }
            }
            else if(firstOperatorPressed == true ){
                // waiting for a new number to accumulate
                // firstOperatorPressed must be set to false in the numberClicked function
            }
            break;
        case '-':
            // number to be operated on is final once an operator is clicked so add it to calculationStack
            if(firstOperatorPressed == false){
                calculationStack.push(displayElement.innerText);
                calculationStack.push('-');

                firstOperatorPressed = true;
                firstDisplayValue = true;
                // display must update after the first operator press to display second number
                if(calculationStack.length>=3){
                    var num1 = Number(calculationStack.shift());
                    var oper = calculationStack.shift();
                    var num2 = Number(calculationStack.shift());
                    var calculatedNumber = calculation(num1,num2,oper);
                    
                    calculationStack.unshift(calculatedNumber);
                    displayElement.innerText = calculatedNumber.toString();
                }
            }
            else if(firstOperatorPressed == true ){
                // waiting for a new number to accumulate
                // firstOperatorPressed must be set to false in the numberClicked function
            }
            break;
        case '+':
            // number to be operated on is final once an operator is clicked so add it to calculationStack
            if(firstOperatorPressed == false){
                calculationStack.push(displayElement.innerText);
                calculationStack.push('+');

                firstOperatorPressed = true;
                firstDisplayValue = true;
                // display must update after the first operator press to display second number
                if(calculationStack.length>=3){
                    var num1 = Number(calculationStack.shift());
                    var oper = calculationStack.shift();
                    var num2 = Number(calculationStack.shift());
                    var calculatedNumber = calculation(num1,num2,oper);
                    
                    calculationStack.unshift(calculatedNumber);
                    displayElement.innerText = calculatedNumber.toString();
                }
            }
            else if(firstOperatorPressed == true ){
                // waiting for a new number to accumulate
                // firstOperatorPressed must be set to false in the numberClicked function
            }
            break;
        case '=':
            // iOS calculator keeps repeating the last operation every time = is clicked
            // ex: 200 / 2 = 100 = 50 = 25 = 12.5 etc there is memory on the last operator
            // and if new display number is clicked, 200 / 2 = 100, replaced by 3 = returns 1.5
            // the last operation is performed on the new display value
            
            if(!equalOperator){ // if equalOperator has not been pressed
                if(!firstOperatorPressed && calculationStack.length==2) {
                    // if firstOperatorPressed is false, once equal sign has 
                    equalOperator = true;
                    // save the second operand to the stack
                    calculationStack.push(displayElement.innerText);
                    // calculatinStack is now of length 3
    
                    //firstOperatorPressed = true; // this blocks all future operators
    
                    firstDisplayValue = true;
                    
                    if(calculationStack.length>=3){
                        var num1 = Number(calculationStack.shift());
                        var oper = calculationStack.shift();
                        var num2 = Number(calculationStack.shift());
                        var calculatedNumber = calculation(num1,num2,oper);
                        
                        // let this unshift happen in the other operators *,/,+,- not by =
                        calculationStack.unshift(calculatedNumber);
                        displayElement.innerText = calculatedNumber.toString();
                    }
                }
                else{
                    // waiting for a new number to accumulate
                    // firstOperatorPressed must be set to false in the numberClicked function
                }
            }else{ // if it has continue operating on the last procedure, until *,/,+,- operator breaks the cycle
                // ex: 200 / 2 = 100 = 50 = 25 (implicit unshift of display value, and oper,num2)

            }
            
            break;
    }
}

function createNumber(numArray,parentElement) {
    //creates an number div element and attaches it to the parentElement
    var numberElement = document.createElement('DIV');
    numberElement.setAttribute('class',numberClass);
    var num = numArray.shift();
    numberElement.innerText = num;
    if(num == '0'){
        numberElement.setAttribute('class',numberClass+' '+'zero');
    }
    numberElement.addEventListener("click", numberClicked,false);
    parentElement.appendChild(numberElement);
}

function createOperation(operArray,parentElement){
    var operationElement = document.createElement('DIV');
    operationElement.setAttribute('class',operationsClass);
    operationElement.innerText = operArray.shift();
    operationElement.addEventListener("click", operationClicked,false);
    parentElement.appendChild(operationElement);
}

//append rows
for(var r=1; r<=5;r++){
    var row = document.createElement('div');
    row.setAttribute('class','row');
    row.setAttribute('id',r);
    calculatorElement.appendChild(row);
}

//append number and operator buttons
for(var r=1; r<=5;r++){
    var row = document.getElementById(r);
    for(var i = 1; i<=4;i++){
        if(r==1){ // first row is all operators
            createOperation(operations,row);
            // console.log('appending ',row);
        }
        else if(r==5 && i==1){ // 
            createNumber(numbers,row);
            // console.log('appending ',row);
        }
        else if(r==5 && i==2){
            //do nothing
        }
        else if(i==4 && r>1){ // last column after row 1 are operators
            createOperation(operations,row);
            // console.log('appending ',row);
        }
        else{
            createNumber(numbers,row);
            // console.log('appending ',row);
        }
    }
}