// When a Physics Sprite is created it is given a body property, which is a reference to its Arcade Physics Body. This represents the sprite as a physical body in Phasers Arcade Physics engine.
// The body object has a lot of properties and methods that we can play with.
// For example, to simulate the effects of gravity on a sprite, it's as simple as writing:
// player.body.setGravityY(300)
// This is an arbitrary value, but logically, the higher the value, the heavier your object feels and the quicker it falls.
let cursors;
let player;
let stars;
let platforms;

class GameScene extends Phaser.Scene {
  preload() {
    this.load.image("applePie", "05_apple_pie.png");
    this.load.image("bg", "game_background_1.png");
    this.load.image("bread", "07_bread.png");
    this.load.image("ground", "platform.png");
    this.load.image("star", "star.png");
    this.load.spritesheet("dude", "dude.png", {
      frameWidth: 32,
      frameHeight: 48,
    });
  }

  // 0x0 to 800x600 max position or else objects will be obb screen
  // phaser 3 game objects are positioned based on their center
  // there are two types of  physics bodies: dynamic and static
  // they static cannot move and isnt affected by other objects colliding
  // staticGroup lets you create children that are all static and place
  // it anywhere on the screen and also set a size
  // refreshbody tells physics the changes we made, which is setScale(2)
  // to make the platform go across the whole screen
  // In Phaser 3 the Animation Manager is a global system.
  // Animations created within it are globally available to all Game Objects.
  // They share the base animation data while managing their own timelines.
  create() {
    // add static background image
    const bg = this.add.image(0, 0, "bg");
    bg.setOrigin(0, 0);
    // scale width
    bg.displayWidth = this.scale.width;
    // scale height
    bg.displayHeight = this.scale.height;
    platforms = this.physics.add.staticGroup();
    platforms.create(400, 568, "ground").setScale(2).refreshBody();
    platforms.create(600, 400, "ground");

    // dynamic physics is automatic
    player = this.physics.add.sprite(100, 450, "dude");
    player.body.enable = true;
    // after landing bounce a little
    player.setBounce(0.2);
    // make player fall faster
    player.body.setGravityY(300);
    // stop player from going out of bounds
    player.setCollideWorldBounds(true);
    // prevents player from going through platform
    // this object monitors two physics objects (which can include Groups)
    // and checks for collisions or overlap between them. If that occurs it can
    // then optionally invoke your own callback, but for the sake of just colliding with platforms we don't require that
    this.physics.add.collider(player, platforms);

    // a sprite sheet has animation frames
    this.anims.create({
      key: "left",
      // use frames 0-3
      frames: this.anims.generateFrameNumbers("dude", { start: 0, end: 3 }),
      // run at 10 frames per second
      frameRate: 10,
      // loop this animation
      repeat: -1,
    });

    this.anims.create({
      key: "turn",
      frames: [{ key: "dude", frame: 4 }],
      frameRate: 20,
    });

    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("dude", { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1,
    });
    cursors = this.input.keyboard.createCursorKeys();
    stars = this.physics.add.group({
      key: "star",
      // get 12 stars in total to come out
      repeat: 11,
      // set position of 12 stars evenly, start with x: 12, y: 0
      // set next star to be 12 + 70 = 82, x: 82, y: 0
      setXY: { x: 12, y: 0, stepX: 70 },
    });
    // any children created will be given the star image key by default and
    // set randomy Y axis bounce when it lands
    stars.children.iterate(function (child) {
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });
    this.physics.add.collider(stars, platforms);
    // check if player overlaps with star and the callback function makes star disappear
    // null is in place of an extra Callback, this is the context for the callback
    this.physics.add.overlap(player, stars, collectStar, null, this);
  }

  // this lets player move and jump
  // this populates the cursors object with four properties: up, down, left, right, that are all instances of Key objects.
  // then all we need to do is poll these in our update loop
  update() {
    if (cursors.left.isDown) {
      player.setVelocityX(-160);

      player.anims.play("left", true);
    } else if (cursors.right.isDown) {
      player.setVelocityX(160);

      player.anims.play("right", true);
    } else {
      player.setVelocityX(0);

      player.anims.play("turn");
    }

    if (cursors.up.isDown && player.body.touching.down) {
      player.setVelocityY(-160);
    }
  }
}

function collectStar (player, star)
{
    star.disableBody(true, true);
}

export default GameScene;