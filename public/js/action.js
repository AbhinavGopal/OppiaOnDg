// action.js

/**
 * This class is used as a wrapper for Google Assistant Canvas Action class
 * along with its callbacks.
 */
class Action {
    /**
     * @param {*} scene which serves as a container of all visual elements
     */
    constructor(scene) {
      this.canvas = window.interactiveCanvas;
      this.scene = scene;
      this.commands = {
        ENTER_TEXT_NUMBER_UNITS: (data) => {
          this.scene.enterInBox(data.details)
        },
        SELECT_ITEMS: (data) => {
          this.scene.selectItems(data.details)
        },
        ENTER_FRACTION: (data) => {
          this.scene.enterFraction(data.details)
        },
        ADD: (data) => {
          this.scene.addToSet(data.details)
        },
        REMOVE: (data) => {
          this.scene.removeFromSet(data.details)
        },
        CONTINUE: (data) => {
          this.scene.continue();
        },
        SUBMIT: (data) => {
          this.scene.submitAnswer();
        },
        HOSTNAME: (data) => {
          console.log('actions area')
          this.scene.sendHostname(data.details)
        },
      };
    }
    /**
     * Register all callbacks used by Interactive Canvas
     * executed during scene creation time.
     *
     */
    setCallbacks() {
      // declare Interactive Canvas callbacks
      const callbacks = {
        onUpdate: (data) => {
          try {
            this.commands[data[0].command.toUpperCase()](data[0]);
          } catch (e) {
            // do nothing, when no command is sent or found
          }
        },
      };
      callbacks.onUpdate.bind(this);
      // called by the Interactive Canvas web app once web app has loaded to
      // register callbacks
      this.canvas.ready(callbacks);
    }
  }
