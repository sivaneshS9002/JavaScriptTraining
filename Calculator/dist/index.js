"use strict";
var inputText = document.querySelector('.input-box');
var userNumber = '';
function hadleClick(value) {
    if (inputText) {
        inputText.value += value;
        userNumber += value;
    }
}
function calculate() {
    var b = true;
    try {
        var result = eval(userNumber);
        if (result === Infinity) {
            throw new Error("Number can't be divided by 0");
        }
        else if (isNaN(result)) {
            console.log(result);
            throw new Error("Mathematical Syntax error");
        }
        else {
            inputText.value = result;
        }
        userNumber = '';
    }
    catch (error) {
        inputText.value = error.message; // Use error.message to get the error text.
    }
}
function hadleClear() {
    inputText.value = "";
    userNumber = '';
}
