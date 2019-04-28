import Phaser from 'phaser'
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../utils/constants'

class VictoryScene extends Phaser.Scene {
  constructor() {
    super({ key: 'victory' })
  }

  init() {
    this._shouldlistenToKeyboard = false
  }

  create() {
    this.keys = this.input.keyboard.addKeys({
      action: Phaser.Input.Keyboard.KeyCodes.Z
    })

    this.add
      .image(0, 0, 'img:background')
      .setAlpha(0.8)
      .setOrigin(0)

    const x = SCREEN_WIDTH / 2
    const y = SCREEN_HEIGHT / 2 - 8

    const container = this.add.container(0, -12)
    container.add(
      this.add
        .bitmapText(x, 0, 'fnt:retro', '- WELL DONE -')
        .setOrigin(0.5)
        .setTint(0xff4f78)
    )
    container.add(
      this.add
        .bitmapText(x, 10, 'fnt:retro', 'PRESS Z TO CONTINUE')
        .setOrigin(0.5)
    )

    this.add.tween({
      targets: container,
      y,
      ease: 'Cubic',
      duration: 1000,
      onComplete: () => {
        this._shouldlistenToKeyboard = true
      }
    })
  }

  update() {
    if (
      this._shouldlistenToKeyboard &&
      Phaser.Input.Keyboard.JustDown(this.keys.action)
    ) {
      this.scene.start('main')
    }
  }
}

export default VictoryScene
