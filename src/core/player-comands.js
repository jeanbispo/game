import {
  mod
} from "./utils.js"
export default function comands() {

  function up(player, state) {
    console.log('up');
    player.y = mod(state.screen.height, player.y - 1)
  }

  function right(player, state) {
    console.log('right');
    player.x = mod(state.screen.width, player.x + 1)

  }

  function left(player, state) {
    console.log('left');
    player.x = mod(state.screen.width, player.x - 1)
  }

  function down(player, state) {
    console.log('down');
    player.y = mod(state.screen.height, player.y + 1)

  }

  function jump(player, state) {
    console.log('jump');
  }

  return {
    up,
    right,
    left,
    down,
    jump
  }


}