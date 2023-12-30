export default class GameScene extends Phaser.Scene {

    preload() {
      this.load.image('applePie', '05_apple_pie.png');
    }
  
    create() {
        // x axis, y axis, use unique key from preload
      this.add.sprite(200, 300, 'applePie');
    }
  
  }