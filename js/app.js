const rollDisplay = document.querySelector('.roll-display')
const historyList = document.querySelector('.history-list')
const totalRoll = document.querySelector('.total-roll')
const rollBtn = document.querySelector('[data-js="roll-btn"]')
const clearHistory = document.querySelector('[data-js="clear-history"]')
const d20 = document.querySelector('[data-js="d20"]')
const d12 = document.querySelector('[data-js="d12"]')
const d6 = document.querySelector('[data-js="d6"]')
const d4 = document.querySelector('[data-js="d4"]')

let historyArray = []
let allHistory = []
//TODO sum all
//let sumArray = []
let divisor = document.createElement('li')




document.addEventListener('DOMContentLoaded', () => {
    let localHistory = localStorage.history.split(',')
    historyArray = localHistory
    updateHistory()
})

const quantityToRoll = event => {
    //reset the divisor text, to prevent continuous addition
    divisor.textContent = ''

    //An object to store all dices, and the respective input values of the quantity
    const dicesAvailable = {
        d20: {
            value: 20,
            quantity: d20.value
        },
        d12: {
            value: 12,
            quantity: d12.value
        },
        d6: {
            value: 6,
            quantity: d6.value
        },
        d4: {
            value: 4,
            quantity: d4.value
        }
    }

    //console.log(Object.keys(dicesAvailable))

    //Here is just to prevent the user to add more than 12 dices to roll
    for (const key in dicesAvailable) {
        if(dicesAvailable[key].quantity > 12) {
            dicesAvailable[key].quantity = 12
            updateInputField(dicesAvailable[key].value)
        }
    }

    //Here just roll when is more than 1 in any dice.
    for (const rollKey in dicesAvailable) {
        if(dicesAvailable[rollKey].quantity > 0) {
            const rollValue = dicesAvailable[rollKey].value
            //for some reason, the updated quantity whe exceeds 12, returns in string, and I need a number
            const rollQuantity = Number(dicesAvailable[rollKey].quantity)

            //after all this, I call the roll function and the function that update the divisor containing the amount of dices rolled
            rollDice(rollValue, rollQuantity) 
            updateDivisor(rollQuantity, rollValue)  
        }
    }

    updateHistory()
}

//With my actual knowledge, this is the best that I can do to prevent a hole bunch of ifs
//This basically updates visual, for the user input
//So, if the user puts more than 12, the input returns to 12
const updateInputField = dice => {
    const diceToUpdate = `d${dice}`
    switch(diceToUpdate) {
        case 'd20':
            d20.value = 12
            break
        case 'd12':
            d12.value = 12
            break
        case 'd6':
            d6.value = 12
            break
        case 'd4':
            d4.value = 12
            break
    }
}

//reduced to one function for all dices, I was doing this separated for every dice haha
const rollDice = (dice, quantity) => {
    for(let index = 0; index < quantity; index++) {
        let diceRolled = Math.ceil(Math.random() * dice)
        //I think this method is a little hard to read, for a beginner, but, it's more maintainable for sure
        historyArray.push(`D${dice}: ${diceRolled}`)
        allHistory.push(`D${dice}: ${diceRolled}`)
  
        //TODO sum all
        //sumArray.push(diceRolled)
    }  



}

const localUpdate = () => {
    //For now this only saves the last roll, not all.
    //I guess that, if I wanna to save all, I'll need to create a variable to store every single roll
    //Yes tested and working with that. I don't know if its the best choice, but for now, works without problems
    //local storage test
    localStorage.setItem('history', allHistory)
    //to test with the local storage
    allHistory.push('---*---')
}

//History section
//change the divisor text to update visual
const updateDivisor = (quantity, value) => {
    //TODO sum all
    //let sum = 0
    //for(let index = 0; index < historyArray.length; index++) {
        //sum = sum + sumArray[index]      
    //}
   
    divisor.textContent += `|${quantity} D${value} `
    //totalRoll.textContent = `The total is ${sum}`

}

//update the history list
const updateHistory = () => {
    localUpdate()
    historyList.appendChild(divisor)
    
    historyArray.forEach(item => {
        let diceLi = document.createElement('li')
        diceLi.textContent = item
        historyList.appendChild(diceLi)   
    })

    //Clears the array after the roll, to prevent adding to just one forever
    historyArray = []
    //TODO sum all
    //sumArray = []
}

//clear the history list
const clearHistoryList = () => {
    //Still don't know if a while is the best choice for this, but, works for now without errors
    while(historyList.children.length > 0) {
        let firstChild = historyList.firstElementChild
        historyList.removeChild(firstChild)
    }
    localStorage.setItem('history', [])
}

//Listeners
rollBtn.addEventListener('click', quantityToRoll)
clearHistory.addEventListener('click', clearHistoryList)