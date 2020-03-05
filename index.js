import createGame from './src/core/game.js'
import createKeyboardListener from './src/core/keyboard-listener.js'
import renderScreen from '/src/core/render-screen.js'

export default function () {


  const playerId = 1;

  const game = createGame()
  const screen = document.getElementById('screen')
  renderScreen(screen, game, requestAnimationFrame, playerId)

  const keyboardListener = createKeyboardListener(document)

  game.addPlayer({
    playerId: 1
  })

  const currentPlayer = game.state.players[playerId]

  keyboardListener.registerPlayerId(playerId)
  keyboardListener.subscribe(game.movePlayer)
  keyboardListener.subscribe((command) => {
    console.log(command);
  })

};