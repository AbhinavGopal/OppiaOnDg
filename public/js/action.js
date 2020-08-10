// action.js

/**
 * This class is used as a wrapper for Google Assistant Canvas Action class
 * along with its callbacks.
 */
class Action {
    /**
     * @param {*} scene which serves as a container of all visual elements
     */
    // stateToFunctionMap = {
    //   'CONTINUE': this.scene.continue,
    //   'ENTER_TEXT_NUMBER_UNITS' : this.scene.enterInBox,
    //   'SUBMIT' : this.scene.submitAnswer,
    //   'SELECT_ITEM' : this.scene.selectItems,
    //   'ADD_SET' : this.scene.addSet,
    //   'REMOVE_SET' : this.scene.removeSet,
    //   'ENTER_FRACTION' : this.scene.enterFraction
    // }
    constructor(scene) {
      this.canvas = window.interactiveCanvas;
      this.scene = scene;
      this.commands = {
        ANSWER_QN: (data) => {
          switch (this.scene.currentState) {
            case 'ENTER_TEXT_NUMBER_UNITS':
              this.scene.enterInBox(data.details)
              break;
            case 'SELECT_ITEMS':
              console.log('this is me\n')
              this.scene.selectItems(data.details)
              break
            case 'ENTER FRACTION':
              this.scene.enterFraction(data.details)
              break;
            case 'SELECT_ITEM_BULLET':
              console.log('here\n')
              this.scene.selectItems(data.details)
              break;
            case 'SELECT_ITEM_CHECKPOINT':
              this.scene.selectItems(data.details)
              break;
            case 'SET_OPERATION':
              if (data.operation_type === 'ADD') {
                this.scene.addSet(data.details)
              } else {
                this.scene.removeSet(data.details)
              }
          } 
        },
        ENTER_TEXT_NUMBER_UNITS: (data) => {
          this.scene.enterInBox(data.details)
        },
        SELECT_ITEM: (data) => {
          this.scene.selectItems(data.details)
        },
        ENTER_FRACTION: (data) => {
          this.scene.enterFraction(data.details)
        },
        ADD: (data) => {
          this.scene.addSet(data.details)
        },
        REMOVE: (data) => {
          this.scene.removeSet(data.details)
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
        }
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
