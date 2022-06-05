const rollDisplay = document.querySelector('.roll-display')
const historyList = document.querySelector('.history-list')
const rollBtn = document.querySelector('[data-js="roll-btn"]')
const clearHistory = document.querySelector('[data-js="clear-history"]')
const d20 = document.querySelector('[data-js="d20"]')
const d12 = document.querySelector('[data-js="d12"]')
const d6 = document.querySelector('[data-js="d6"]')
const d4 = document.querySelector('[data-js="d4"]')

let historyArray = []
let divisor = document.createElement('li')

//Para o futuro eu, descubra uma forma de reduzir esses ifs e funções identicas, a maioria é copia e cola, então deve ter um jeito mais legivel de se fazer isso. Meus pensamentos atuais são o de usar um objeto, com a chave sendo o nome do dado, e o valor sendo o value mesmo, pelo menos eu conseguiria usar isso de uma forma mais direta do que chamando função por função. Se o valor for 0, ele só deve pular aquela execução.

const quantityToRoll = event => {

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
    for (const key in dicesAvailable) {
        if(dicesAvailable[key].quantity > 12) {
            dicesAvailable[key].quantity = 12
            updateInputField(dicesAvailable[key].value)
        }
    }

    for (const rollKey in dicesAvailable) {
        if(dicesAvailable[rollKey].quantity > 0) {
            const rollValue = dicesAvailable[rollKey].value
            const rollQuantity = Number(dicesAvailable[rollKey].quantity)
            rollDice(rollValue, rollQuantity)
        }
    }
/* 
    if(d20.value > 0 && d20.value <= 12) {
        rollD20(d20.value)
    }
    if(d12.value > 0 && d12.value <= 12) {
        rollD12(d12.value)
    }
    if(d6.value > 0 && d6.value <= 12) {
        rollD6(d6.value)
    }
    if(d4.value > 0 && d4.value <= 12) {
        rollD4(d4.value)
    } */
    //divisor.textContent = `${d20.value} D20, ${d12.value} D12, ${d6.value} D6, ${d4.value} D4 `
    updateHistory()
}

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



//reduced to one function for all dices, I was doing this separated
const rollDice = (dice, quantity) => {
    for(let index = 0; index < quantity; index++) {
        let diceRolled = Math.ceil(Math.random() * dice)
        historyArray.push(`D${dice}: ${diceRolled}`)
    }
}








/* 
//D20
const rollD20 = d20Quantity => {
    for(let index = 0; index < d20Quantity; index++) {
        let d20Rolled = Math.ceil(Math.random() * 20)
        historyArray.push(` D20: ${d20Rolled} `)
    } 
}

//D12
const rollD12 = d12Quantity => {
    for(let index = 0; index < d12Quantity; index++) {
        let d12Rolled = Math.ceil(Math.random() * 12)
        historyArray.push(` D12: ${d12Rolled} `)
    } 
}

//D6
const rollD6 = d6Quantity => {
    for(let index = 0; index < d6Quantity; index++) {
        let d6Rolled = Math.ceil(Math.random() * 6)
        historyArray.push(` D6: ${d6Rolled} `)
    } 
}

//D4
const rollD4 = d4Quantity => {
    for(let index = 0; index < d4Quantity; index++) {
        let d4Rolled = Math.ceil(Math.random() * 4)
        historyArray.push(` D4: ${d4Rolled} `)
    } 
}
 */
//update the history section
const updateHistory = () => {

    
    divisor.textContent = '------**------' 
    historyList.appendChild(divisor)
    historyArray.forEach(item => {
        let diceLi = document.createElement('li')
        diceLi.textContent = item
        historyList.appendChild(diceLi)   
    })
    historyArray = []
}

//clear the histpry list
const clearHistoryList = () => {
    while(historyList.children.length > 0) {
        let firstChild = historyList.firstElementChild
        historyList.removeChild(firstChild)
    }
}

rollBtn.addEventListener('click', quantityToRoll)
clearHistory.addEventListener('click', clearHistoryList)