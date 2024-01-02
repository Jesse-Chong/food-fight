class GameScene extends Phaser.Scene {

    preload() {
      this.load.image('applePie', '05_apple_pie.png');
      this.load.image('bg', 'game_background_1.png');
      this.load.image('bread', '07_bread.png');
    }
  
    //0x0 to 800x600 max position or else objects will be obb screen 
    // phaser 3 game objects are positioned based on their center
    // there are two types of  physics bodies: dynamic and static
    // they static cannot move and isnt affected by other objects colliding
    // staticGroup lets you create children that are all static and place
    // it anywhere on the screen and also set a size
    create() {
        // add static background image 
        const bg = this.add.image(0, 0, 'bg');
        bg.setOrigin(0, 0);
        // scale width
        bg.displayWidth = this.scale.width;
        // scale height
        bg.displayHeight = this.scale.height;
        let platforms;
        platforms = this.physics.add.staticGroup();
        platforms.create(400, 568, 'bread').setScale(2).refreshBody();

platforms.create(600, 400, 'bread');
platforms.create(50, 250, 'bread');
platforms.create(750, 220, 'bread');

    }
    
  
  }

  export default GameScene