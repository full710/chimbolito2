import Menu from "./scenes/Menu.js";
import Game  from "./scenes/Game.js";
import End from "./scenes/End.js";
 

const config = {
  type: Phaser.AUTO,
  width: 750,
  height: 1334,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 300 },
      debug: false,
    },
  },
  
  scene: [Menu, Game, End ],
};


window.game = new Phaser.Game(config);
