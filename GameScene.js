export default class GameScene extends Phaser.Scene {

    preload() {
      this.load.image('applePie', '05_apple_pie.png');
      this.load.image('bg', 'game_background_1.png');
    }
  
    create() {
        // x axis, y axis, use unique key from preload
      this.add.sprite(200, 300, 'applePie');
        // add static background image 
        const bg = this.add.image(0, 0, 'bg');
        bg.setOrigin(0, 0);
        // scale width
        bg.displayWidth = this.scale.width;
        // scale height
        bg.displayHeight = this.scale.height;
    }
  
  }