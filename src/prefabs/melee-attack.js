import Phaser from 'phaser'

class MeleeAttack extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, angle, offset) {
    super(scene, x, y, 'img:melee')

    scene.add.existing(this)
    scene.physics.add.existing(this)

    this.angle = angle
    this.setBodyFromAngle(angle)

    this.play('attack:melee')
    this.on('animationcomplete-attack:melee', () => {
      this.destroy()
    })

    this.offset = offset
  }

  static CreateAnimations(scene) {
    scene.anims.create({
      key: 'attack:melee',
      frames: scene.anims.generateFrameNumbers('img:melee', {
        frames: [0, 1, 2, 2, 3]
      }),
      frameRate: 18
    })
  }

  updatePositionFromParent(x, y) {
    this.x = x + this.offset.x
    this.y = y + this.offset.y
  }

  setBodyFromAngle(angle) {
    // normalize angle between -180 and 180
    angle = Phaser.Math.Angle.WrapDegrees(angle)
    const isVertical = angle === 0 || Math.abs(angle) === 180
    let offsetX = 0
    let offsetY = 0
    let width = 16
    let height = 16

    if (isVertical) {
      width = 8
      offsetX = angle === 0 ? 8 : 0
    } else {
      height = 8
      offsetY = angle === 90 ? 8 : 0
    }

    this.setSize(width, height).setOffset(offsetX, offsetY)
  }
}

export default MeleeAttack
