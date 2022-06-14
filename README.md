## A simple dice app, to study LocalStorage.
The dices available is: D100, D20, D12, D10, D8, D6, D4
[Live version](https://dice-app-study.pages.dev/)

- Nesse eu sofri um tanto para resolver o If hell que ia acontecer pela necessidade de checagens que eu tava fazendo haha. A conclusão foi a seguinte:
    - Usar um objeto para guardar cada dado que eu quiser
    - Como eu queria um limite de 12 dados rolados para cada, usando esse objeto eu checaria a quantidade armazenada, e caso passasse de 12, eu chamo uma função, passando o valor do dado.
    ```js
        for (const key in dicesAvailable) {
            if(dicesAvailable[key].quantity > 12) {
                dicesAvailable[key].quantity = 12
                updateInputField(dicesAvailable[key].value)
            }
        }
    ```
    - Na função, eu usaria o template string do js para formatar, pegando o valor, que ta guardado no objeto e adicionando o 'd' na frente, para facilitar a leitura. Ai só usar o switch para fazer as verificações e alterar caso necessário, isso ajuda no futuro caso eu queira aumentar a quantidade de dados.
    ```js
    const updateInputField = dice => {
        const diceToUpdate = `d${dice}`
        switch(diceToUpdate) {
            case 'd20':
                d20.value = 12
                break
        }
    }
    ```
- Outro problema que eu tive, mas foi mais por mal planejamento inicial, foi o da função que faria a rolagem dos dados. Inicialmente eu separei uma função para cada dado, o que se mostrou desnecessário até demais haha. No fim, depois de pensar um pouco eu cheguei na conclusão (por mais que eu tenha noção de que para dados complexos ela não funciona):
    - Eu recebo o tipo de dado, e a quantidade vindos da função que é chamada pelo botão de rolar.
    - Crio um loop, para a quantidade passada, e uso o Math.Ceil para evitar números quebrados, dentro dele o Math.random, passando o dado (que nesse caso é o value do objeto dado) como parametro de rolagem.
    - Após isso eu formato o resultado com template string e guardo cada um em uma array.
    ```js
    const rollDice = (dice, quantity) => {
        for(let index = 0; index < quantity; index++) {
            let diceRolled = Math.ceil(Math.random() * dice)
            historyArray.push(`D${dice}: ${diceRolled}`)
        }
    }
    ```
