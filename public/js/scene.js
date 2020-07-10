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
    temporary() {
        pass
    }
    continue() {
        //need to post some message to the oppia iframe.\
        console.log('posting message')
        console.log('incoming try-catch')
        try{
            console.log('attempting here')
            iframe.postMessage("CONTINUE", '*');
        } catch (e) {
            console.log('failed', e)
        }
        console.log("POSTED THE CONTINUE MESSAGE IN OPPIA")
    }
}
scene = new Scene();



