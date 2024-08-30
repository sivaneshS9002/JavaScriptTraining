let inputText = document.querySelector('.input-box') as HTMLInputElement;
let userNumber: string = '';
function hadleClick(value: any): void {
    if (inputText) {
        inputText.value += value;
        userNumber += value;
    }
}

function calculate(): void {
    let b: boolean = true;
    try {
        let result = eval(userNumber);
    
        if (result === Infinity) {
            throw new Error("Number can't be divided by 0");
        } else if (Number(result)) {
            inputText.value = result;
        } else {
            console.log(result)
            throw new Error("Mathematical Syntax error");
        }
    
        userNumber = '';
    } catch (error: any) {
        inputText.value = error.message; // Use error.message to get the error text.
    }
}


function hadleClear() {
    inputText.value = "";
    userNumber = '';
}