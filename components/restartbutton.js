export class restartbutton {
    constructor (scene){
        this.releatedScene= scene;
    }

    preload(){
        this.releatedScene.load.image("button","public/assets/button.png");  
    }

    create(){
        this.startButton= this.releatedScene.add.image (340, 667, "button").setScale(4).setInteractive()
        

        this.startButton.on ("pointerdown",()=>{ 
            this.releatedScene.scene.start("Game");
        });
    }

}