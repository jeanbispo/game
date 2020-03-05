import createPlayerCommands from "./player-comands.js"

export default function createGame() {

  const playerCommands = createPlayerCommands();


  const state = {
    players: {},
    fruits: {},
    screen: {
      width: 25,
      height: 25,
      pixelsPerFields: 16, //less than 15 is hard to read the points
    },
    config: {
      maxCollisionDistance: 4,
      playerCollisionCost: 100,
      wallCollisionCost: 150,
      initialScore: 500,
      autoDropFruitValue: 50,
      showPotsValue: false,
    }
  }

  const observers = []

  function start() {
    // const frequency = 2000

    // //todo: change fruit colors based on quantity on same coord
    // setInterval(addFruit, frequency)
  }

  function subscribe(observerFunction) {
    observers.push(observerFunction)
  }

  function notifyAll(command) {
    for (const observerFunction of observers) {
      observerFunction(command)
    }
  }

  function setState(newState) {
    Object.assign(state, newState)
  }

  function addPlayer(command) {
    const playerId = command.playerId
    const playerX = 'playerX' in command ? command.playerX : Math.floor(Math.random() * state.screen.width)
    const playerY = 'playerY' in command ? command.playerY : Math.floor(Math.random() * state.screen.height)

    state.players[playerId] = {
      playerId: playerId,
      x: playerX,
      y: playerY,
      score: state.config.initialScore
    }

    notifyAll({
      type: 'add-player',
      playerId: playerId,
      playerX: playerX,
      playerY: playerY,
      score: state.config.initialScore
    })
  }

  function removePlayer(command) {
    const playerId = command.playerId

    delete state.players[playerId]

    notifyAll({
      type: 'remove-player',
      playerId: playerId
    })
  }

  function onBorderShock(player) {
    const {
      config: {
        wallCollisionCost
      }
    } = state
    let shockCost = Math.min(player.score, wallCollisionCost)
    state.players[player.playerId].score -= shockCost
    explodeFruits(shockCost, player.x, player.y)

    //only play this sound for this user who sock against the wall
    notifyAll({
      type: 'play-audio',
      audio: 'wallCollision',
      playersId: [player.playerId]
    })
  }


  function movePlayer(command) {
    notifyAll(command)

    const acceptedMoves = {
      //para cima
      ArrowUp(player) {
        console.log(state);
        console.log(player);
        playerCommands.up(player, state)
      },
      w(player) {
        playerCommands.up(player, state)
      },
      W(player) {
        playerCommands.up(player, state)
      },
      //para direita
      ArrowRight(player) {
        playerCommands.right(player, state)
      },
      d(player) {
        playerCommands.right(player, state)
      },
      D(player) {
        playerCommands.right(player, state)
      },
      //para baixo
      ArrowDown(player) {
        playerCommands.down(player, state)
      },
      s(player) {
        playerCommands.down(player, state)
      },
      S(player) {
        playerCommands.down(player, state)
      },
      //para esquerda
      ArrowLeft(player) {
        playerCommands.left(player, state)
      },
      a(player) {
        playerCommands.left(player, state)
      },
      A(player) {
        playerCommands.left(player, state)
      },
      //pular
      Space(player) {
        playerCommands.jump(player, state)
      }

    }

    const keyPressed = command.keyPressed
    const playerId = command.playerId
    const player = state.players[playerId]
    const moveFunction = acceptedMoves[keyPressed]


    if (player && moveFunction) {
      moveFunction(player)
    }

  }
  return {
    addPlayer,
    removePlayer,
    movePlayer,
    state,
    setState,
    subscribe,
    start
  }

}