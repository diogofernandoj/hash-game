const fields = document.querySelectorAll('.field')
const playerTurn = document.querySelector('.current')
const endgameContainer = document.querySelector('.endgame')
const endgameMessage = document.querySelector('.endgame-msg')
const restartBtn = document.querySelector('.restart-btn')

let current = 'x'
let game = true;

restartBtn.addEventListener('click', () => {
    startGame()
})

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

function checkForWin(currentPlayer) {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return fields[index].classList.contains(currentPlayer)
        })
    })
}
function checkForDraw() {
    return [...fields].every(field => field.classList.contains('x') || field.classList.contains('circle'))
}

function startGame() {
    fields.forEach(field => field.className = 'field')
    endgameContainer.style.visibility = 'hidden'
    game = true
}

function endgame(draw = false) {
    if(!draw) {
        if(current === 'x'){
            endgameMessage.innerText = 'X Venceu!'
        } else if(current === 'circle') {
            endgameMessage.innerText = 'Bolinha venceu!'
        }
    } else if (draw){
        endgameMessage.innerText = 'Empate!'
    }
    game = false
    endgameContainer.style.visibility = 'visible'
}

fields.forEach(field => {
    field.addEventListener('click', () => {

        // Marcar X ou Circle
        if(field.className === 'field' && game === true) {
            field.className = `field ${current}`

            // Verificar vitória
            if(checkForWin(current)){
                endgame(false)

            // Verificar empate
            } else if (checkForDraw()) {
                endgame(true)

            // Mudar jogador
            } else {
                if (current === 'x') {
                    current = 'circle'
                    playerTurn.className = 'current circle'
                } else {
                    current = 'x'
                    playerTurn.className = 'current x'
                }
            }
        }
    })
})
