import {restartbutton} from "../components/restartbutton.js"
export default class End extends Phaser.Scene {
    constructor() { 
      super("End");
      this.restartbutton= new restartbutton(this);
    }
    
      preload(){
        this.load.image("background", "public/assets/fondo.png");
        this.load.image("gameover", "public/assets/GAMEOVER.png");
        this.restartbutton.preload();
      }
      create() {
        this.fondo = this.add.image(400, 300, "background")
        this.fondo.setScale(7);
        this.restartbutton.create();

        this.gameover=this.add.image(430,500, "gameover").setScale(5);

      }
      
}