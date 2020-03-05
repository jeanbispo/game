export default function createKeyboardListener(document) {

  const state = {
    observers: [],
    playerId: null
  }

  function registerPlayerId(playerId) {
    state.playerId = playerId
  }


  function subscribe(observerFunction) {
    state.observers.push(observerFunction)
  }

  function unsubscribeAll(observerFunction) {
    state.observers = []
  }

  function notifyAll(command) {
    // console.log(state);
    for (const observerFunction of state.observers) {
      observerFunction(command)
    }
  }


  document.addEventListener('keydown', handleKeydown)

  function handleKeydown(event) {
    let keyPressed = event.key
    if (event.code === 'Space') keyPressed = 'Space'
    const command = {
      type: 'move-player',
      playerId: state.playerId,
      keyPressed
    }
    notifyAll(command)
  }

  return {
    subscribe,
    unsubscribeAll,
    registerPlayerId
  }
}