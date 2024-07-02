import {restartbutton} from "../components/restartbutton.js"
export default class Menu extends Phaser.Scene {
    constructor() { 
      super("Menu");
      this.restartbutton= new restartbutton(this);
    }
    
      preload(){
        this.load.image("background", "public/assets/fondo.png");
        this.load.image("titulo", "public/assets/titulo.png");
        
        this.restartbutton.preload();
      }
      create() {
        this.fondo = this.add.image(400, 300, "background")
        this.fondo.setScale(7);
        this.restartbutton.create();
      

        this.titulo=this.add.image(380,600, "titulo").setScale(5);
      }
      
}