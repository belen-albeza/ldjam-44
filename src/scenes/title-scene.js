import Phaser from 'phaser'
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../utils/constants'

class TitleScene extends Phaser.Scene {
  constructor() {
    super({ key: 'title' })
  }

  init(data = {}) {
    this._shouldlistenToKeyboard = false
    this._steps = data.shallSkipTutorial
      ? [{ color: 0xff4f78, text: 'ESSENCE DRAIN' }]
      : [
          { color: 0xff4f78, text: 'ESSENCE DRAIN' },
          { color: 0xffffff, text: 'MOVE WITH ARROW KEYS' },
          { color: 0xffffff, text: 'ATTACK WITH Z KEY' },
          { color: 0xffffff, text: 'THOSE CONSUME ESSENCE. WATCH OUT!' },
          { color: 0xff4f78, text: 'START GAME' }
        ]
    this._stepIndex = 0
  }

  create() {
    if (this._steps.length > 1) {
      this.bgm = this.sound.add('bgm:main', { loop: true, volume: 0.8 })
    }

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

    this.label = this.add
      .bitmapText(x, 0, 'fnt:retro', 'ESSENCE DRAIN')
      .setOrigin(0.5)
      .setTint(0xff4f78)
    container.add(this.label)

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

  nextLabel() {
    this._stepIndex += 1
    if (this._stepIndex >= this._steps.length) return false

    this.label.setText(this._steps[this._stepIndex].text)
    this._shouldlistenToKeyboard = false
    this.time.delayedCall(500, () => (this._shouldlistenToKeyboard = true))

    return true
  }

  update() {
    if (
      this._shouldlistenToKeyboard &&
      Phaser.Input.Keyboard.JustDown(this.keys.action)
    ) {
      const isTutorialInProgress = this.nextLabel()
      if (!isTutorialInProgress) {
        if (this.bgm) this.bgm.play()
        this.scene.start('main')
      }
    }
  }
}

export default TitleScene
