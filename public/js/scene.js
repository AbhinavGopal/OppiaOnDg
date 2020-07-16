const view = document.getElementById('view');
var iframe = document.getElementById('oppia-iframe')
document.onload = function() {
    button = document.getElementByTagName('oppia-iframe').contentWindow.getElementByTagName('oppia-learner-confirm-button protractor-test-continue-button md-button md-ink-ripple')
}

interactiveCanvas.getHeaderHeightPx().then((headerHeight) => {
    document.body.style.paddingTop = `${headerHeight}px`;
});

  

class Scene {
    constructor() {
        console.log('here in scene constructor')
        this.action = new Action(this)
        this.action.setCallbacks()
        return this
    }
    continue() {
        //need to post some message to the oppia iframe.\
        console.log('posting message...')
        iframe = document.getElementById('oppia-iframe').contentWindow
        try{
            iframe.postMessage("CONTINUE", '*');
            console.log('successful')
        } catch (e) {
            console.log('failed', e)
        }
    }
    enterInBox(message) {
        console.log('posting message...')
        iframe = document.getElementById('oppia-iframe').contentWindow
        try{
            iframe.postMessage("ENTER_TEXT_NUMBER_UNITS " + messageZ, '*');
            console.log('successful')
        } catch (e) {
            console.log('failed', e)
        }
    }

}
scene = new Scene();



