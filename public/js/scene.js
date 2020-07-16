const view = document.getElementById('view');
window.onload = function() {
    interactiveCanvas.getHeaderHeightPx().then((headerHeight) => {
    document.body.style.paddingTop = `${headerHeight}px`;
});
} 

class Scene {
    constructor() {
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



