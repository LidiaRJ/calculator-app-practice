//Select all num buttons
//Select operator buttons
//select AC & Del buttons
//Select output

//Create class to store the data
class Calculator {
    //Use constructor to take all inputs and functions
    constructor(previousOp, currentOp) {
        //Set variables for the class
        this.previousOp = previousOp
        this.currentOp = currentOp
        this.readyToReset = false
        this.clear()
    }

    //Define all the functions in our calculator
    clear () {
        this.currentOperand = ""
        this.previousOperand = ""
        this.operation = undefined //No operation selected
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    //Add num to the screen 
    appendNumber(number) { 
        //Check if we already have a '.'  or user clicks it. Only allows 1 '.' by adding 'return'
        if (number === "." && this.currentOperand.includes(".")) return

        //Turn all nums into string so JS appends them instead of adding (sum) them 
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    chooseOperation(operation) {
        //set the operation
        if (this.currentOperand === "") return
        if (this.currentOperand !== "" && this.previousOperand !== "") {
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''

    }

    compute() {
        //Result of compute function
        let computation
        //convert string to numer 
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(current)) return
        
        switch (this.operation) {
            //Like if statements chained to each other on single object
            case '+': 
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '*':
                computation = prev * current
                break
            case '÷':
                computation = prev / current
                break

            default: 
            //works as else statement
                return //if no computation we dont execute the code
        }
        this.readyToReset = true
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ""
    }

    //Adds comas to our number automatically
    getDisplayNumber(number) {
        //To spli the num before the coma and after the coma
        const stringNum = number.toString()
        //Get 1st num before come [0]
        const intergerDigits = parseFloat(stringNum.split('.')[0])
        const decimalDigits = stringNum.split('.')[1]
        let intergerDisplay
        if (isNaN(intergerDigits)) {
            intergerDisplay = ''
        } else {
            intergerDisplay = intergerDigits.toLocaleString('en', {
                maximumFractionDigits: 0}) //make sure no more decimal places after this
        }

        if (decimalDigits != null) {
            return `${intergerDisplay}.${decimalDigits}`
        } else {
            return intergerDisplay
        }
    }

    updateDisplay() {
        this.currentOp.innerText = this.getDisplayNumber(this.currentOperand)
        //this.previousOp.innerText = this.previousOperand
        if (this.operation != null) {
            this.previousOp.innerText = `${this.previousOperand} ${this.operation}`
        } else {
            this.previousOp.innerText = ""
        }
    }

    buttonSound(audio) {
        var audio = new Audio("button-sound.mp3")
        audio.play()
    }

 }

function playEffect() {
    audioeff.play()
}

//Use data classes to identify elements in html
const numberBtns = document.querySelectorAll('[data-number]')
const operationBtns = document.querySelectorAll('[data-operation]')
const equalButton = document.querySelector('[data-equals]')
const clearButton = document.querySelector('[data-clear]')
const deleteButton = document.querySelector('[data-delete]')
const previousOp = document.querySelector('[data-prevOp]')
const currentOp = document.querySelector('[data-currentOp]')
const audioeff = new Audio("button-sound.mp3")

/*numberBtns.document.onclick = function() {
    audio.play()
}*/




//Create new calculator (object) and pass all the elements we have in the constructor
const calculator = new Calculator(previousOp, currentOp)

clearButton.addEventListener('click', () => {
    calculator.clear()
    calculator.updateDisplay()
})

numberBtns.forEach(button => {
    button.addEventListener('click', () => {
        if (calculator.previousOperand === "" &&
        calculator.currentOperand !== "" && 
        calculator.readyToReset) {
            calculator.currentOperand = ""
            calculator.readyToReset = false
        }

        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationBtns.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})
