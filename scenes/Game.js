export default class Game extends Phaser.Scene {
  constructor() {
    super("Game");
  }

  init() {
    this.gameOver = false;
    this.timer = 60;
    this.score = 0;
    this.shapes = {
      hamburguesa: { points: 10, count: 0 },
      estrella: { points: 50, count: 0 },
    };
  }

  preload() {
    this.load.image("fondo", "public/assets/fondo.png");
    this.load.image("personaje", "public/assets/Player.png");
    this.load.image("enemigo", "public/assets/enemigo.png");
    this.load.image("hamburguesa", "public/assets/comidaGalactica.png");
    this.load.image("estrella", "public/assets/estrella.png");
    this.load.audio("music", "public/assets/sounds/music.mp3");
    this.load.image("leftButton", "public/assets/leftButton.png");
    this.load.image("rightButton", "public/assets/rightButton.png");
  }

  create() {
    this.fondo = this.add.image(400, 300, "fondo").setScale(7);
    this.player = this.physics.add.sprite(400, 1100, "personaje");
    this.player.setSize(this.player.width * 0.5, this.player.height * 1);
    this.player.setCollideWorldBounds(true);

    this.cursor = this.input.keyboard.createCursorKeys();
    this.r = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);

    this.recolectables = this.physics.add.group();
    this.enemigos = this.physics.add.group();

    this.time.addEvent({
      delay: 2000,
      callback: this.onrecolect,
      callbackScope: this,
      loop: true,
    });
    this.time.addEvent({
      delay: 5000,
      callback: this.onenemy,
      callbackScope: this,
      loop: true,
    });
    this.time.addEvent({
      delay: 1000,
      callback: this.updateTimer,
      callbackScope: this,
      loop: true,
    });

    this.timerText = this.add.text(10, 10, `Tiempo restante: ${this.timer}`, {
      fontSize: "40px",
      fill: "#ffff",
    });

    this.scoreText = this.add.text(10, 50, `Puntaje: ${this.score}`, {
      fontSize: "40px",
      fill: "#ffff",
    });

    this.physics.add.collider(this.player, this.recolectables, this.onShapeCollect, null, this);
    this.physics.add.collider(this.player, this.enemigos, this.onShapemort, null, this);

    this.music = this.sound.add("music");
    this.music.play();

    // Agregar botones
    this.leftButton = this.add.image(80, 1250, 'leftButton').setInteractive().setScale(0.15);
    this.rightButton = this.add.image(670, 1250, 'rightButton').setInteractive().setScale(0.15);

    // Manejo de eventos para botones en pantallas táctiles
    this.leftButton.on('pointerdown', () => { this.leftButtonPressed = true; });
    this.leftButton.on('pointerup', () => { this.leftButtonPressed = false; });
    this.leftButton.on('pointerout', () => { this.leftButtonPressed = false; });
    this.leftButton.on('pointerout', () => { this.leftButtonPressed = false; });
    
    this.rightButton.on('pointerdown', () => { this.rightButtonPressed = true; });
    this.rightButton.on('pointerup', () => { this.rightButtonPressed = false; });
    this.rightButton.on('pointerout', () => { this.rightButtonPressed = false; });

    this.leftButtonPressed = false;
    this.rightButtonPressed = false;
  }

  update() {
    if (this.timer <= 0) {
      this.showEnd();
    }

    if (this.cursor.left.isDown || this.leftButtonPressed) {
      this.player.setVelocityX(-160);
      this.player.setScale(-1, 1);
      this.player.body.offset.x = 220;
      this.player.anims.play("left", true);
    } else if (this.cursor.right.isDown || this.rightButtonPressed) {
      this.player.setVelocityX(160);
      this.player.setScale(1, 1);
      this.player.body.offset.x = 75;
      this.player.anims.play("right", true);
    } else {
      this.player.setVelocityX(0);
      this.player.anims.play("idle", true);
    }
  }

  onrecolect() {
    const tipos = ["hamburguesa", "estrella"];
    const tipo = Phaser.Math.RND.pick(tipos);
    let recolectables = this.recolectables.create(
      Phaser.Math.Between(10, 790),
      0,
      tipo
    );
    recolectables.setVelocity(0, 100);
    recolectables.setSize(recolectables.width * 0.2, recolectables.height * 0.2).setScale(2.5);

    recolectables.setData("points", this.shapes[tipo].points);
    recolectables.setData("tipo", tipo);
  }

  onenemy() {
    const tipos = ["enemigo"];
    const tipo = Phaser.Math.RND.pick(tipos);
    let enemigos = this.enemigos.create(
      Phaser.Math.Between(10, 790),
      0,
      tipo
    );
    enemigos.setVelocity(0, 100);
    enemigos.setSize(enemigos.width * 0.5, enemigos.height * 0.5).setScale(4);
  }

  onShapeCollect(player, recolectables) {
    const nombreFig = recolectables.getData("tipo");
    const points = recolectables.getData("points");

    this.score += points;
    this.shapes[nombreFig].count += 1;

    console.table(this.shapes);
    console.log("recolectado", recolectables.texture.key, points);
    console.log("score ", this.score);

    if (nombreFig === "hamburguesa") {
      this.sumarTiempo();
    }

    recolectables.destroy();

    this.scoreText.setText(`Puntaje: ${this.score}`);
  }

  onShapemort() {
    this.scene.start("End");
    this.music.stop();
  }

  updateTimer() {
    this.timer -= 1;
    this.timerText.setText(`Tiempo restante: ${this.timer}`);
  }

  sumarTiempo() {
    this.timer += 10;
    this.timerText.setText(`Tiempo restante: ${this.timer}`);
  }

  showEnd() {
    this.scene.start("End");
    this.music.stop();
  }
}
