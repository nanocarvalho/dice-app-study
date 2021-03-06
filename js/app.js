const rollDisplay = document.querySelector('.roll-display')
const historyList = document.querySelector('.history-list')
const totalRoll = document.querySelector('.total-roll')
const rollBtn = document.querySelector('[data-js="roll-btn"]')
const clearHistory = document.querySelector('[data-js="clear-history"]')
//Dices
const d100 = document.querySelector('[data-js="d100"]')
const d20 = document.querySelector('[data-js="d20"]')
const d12 = document.querySelector('[data-js="d12"]')
const d10 = document.querySelector('[data-js="d10"]')
const d8 = document.querySelector('[data-js="d8"]')
const d6 = document.querySelector('[data-js="d6"]')
const d4 = document.querySelector('[data-js="d4"]')

let historyArray = []
let allHistory = []

//Split the localstorage array to get every single one
document.addEventListener('DOMContentLoaded', () => {
    if(!localStorage.history) {
        return
    }
    let localHistory = localStorage.history.split(',')
    historyArray = localHistory
    updateHistory()
})

const quantityToRoll = event => {
    //An object to store all dices, and the respective input values of the quantity
    const dicesAvailable = {
        d100: {
            value: 100,
            quantity: d100.value
        },
        d20: {
            value: 20,
            quantity: d20.value
        },
        d12: {
            value: 12,
            quantity: d12.value
        },
        d10: {
            value: 10,
            quantity: d10.value
        },
        d8: {
            value: 8,
            quantity: d8.value
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
        }
    } 
}

//With my actual knowledge, this is the best that I can do to prevent a hole bunch of ifs
//This basically updates visual, for the user input
//So, if the user puts more than 12, the input field returns to 12
const updateInputField = dice => {
    const diceToUpdate = `d${dice}`
    switch(diceToUpdate) {
        case 'd20':
            d20.value = 12
            break
        case 'd12':
            d12.value = 12
            break
        case 'd10':
            d10.value = 12
            break
        case 'd100':
            d100.value = 12
            break
        case 'd8':
            d8.value = 12
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
    }  
    updateHistory()
}

const localUpdate = () => {

    localStorage.setItem('history', allHistory)
}


//update the history list
const updateHistory = () => {
	localUpdate()
    
    historyArray.forEach(item => {
        let diceLi = document.createElement('li')
        diceLi.textContent = item
        historyList.appendChild(diceLi)   
    })

    let divisor = document.createElement('li')
    divisor.textContent = '------'
    historyList.appendChild(divisor)

    //Clears the array after the roll, to prevent adding to just one forever
    historyArray = []
    
}

//clear the history list
const clearHistoryList = () => {
    //Still don't know if a while is the best choice for this, but, works for now without errors
    while(historyList.children.length > 0) {
        let firstChild = historyList.firstElementChild
        historyList.removeChild(firstChild)
    }
    localStorage.setItem('history', '')
    localStorage.setItem('diceRolled', '')
}

//Listeners
rollBtn.addEventListener('click', quantityToRoll)
clearHistory.addEventListener('click', clearHistoryList)