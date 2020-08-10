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
        this.currentState = ''
        return this
    }

    sendHostname(name) {
        var iframe = document.getElementById('oppia-iframe').contentWindow
        try{
            var message = "HOST_NAME " + name
            iframe.postMessage(message, '*');
        } catch {
            console.log('failed')
        }
    }

    answerQuestion(message) {
        var completeMessage = currentState + " " + message;
        var iframe = document.getElementById('oppia-iframe').contentWindow
        try {
            iframe.postMessage(completeMessage, "*")
        } catch {
            console.log('failed')
        }
    }


    enterInBox(message) {
        var iframe = document.getElementById('oppia-iframe').contentWindow
        try{
            var message = "ENTER_TEXT_NUMBER_UNITS " + message
            iframe.postMessage(message, '*');
        } catch {
            console.log('failed')
        }
    }

    continue() {
        //need to post some message to the oppia iframe.
        var iframe = document.getElementById('oppia-iframe')
        try{
            iframe.contentWindow.postMessage("CONTINUE", '*');
        } catch (e) {
            console.log('failed', e)
        }
    }

    submitAnswer() {
        //need to post some message to the oppia iframe.
        var iframe = document.getElementById('oppia-iframe')
        try{
            iframe.contentWindow.postMessage("SUBMIT", '*');
        } catch (e) {
            console.log('failed', e)
        }
    }

    selectItems(numbers) {
        if (this.currentState == 'SELECT_ITEM_BULLET') {
            var message = "SELECT_ITEM_BULLET " + numbers;
            iframe.postMessage(message, '*');
        } else {
            for (var number of numbers) {
                var message = "SELECT_ITEM_CHECKBOX" + number;
                iframe.postMessage(message, '*');
            }
        }
    }

    enterFraction(fraction) {
        var iframe = document.getElementById('oppia-iframe').contentWindow
        try{
            var message = "ENTER_FRACTION " + fraction
            iframe.postMessage(message, '*');
        } catch {
            console.log('failed')
        }
    }

    addSet(items) {
        var iframe = document.getElementById('oppia-iframe').contentWindow
        try {
            var message = "ADD_SET " + items
            iframe.postMessage(message, '*');
        } catch {
            console.log('failed')
        }
    }

    removeSet(items) {
        var iframe = document.getElementById('oppia-iframe').contentWindow
        for (const item of items) {
            try{
                var message = "REMOVE_SET " + item
                iframe.postMessage(message, '*');
            } catch {
                console.log('failed')
            }
        }
    }

}
scene = new Scene();

window.addEventListener('message', (event) => {
    console.log(event.data)
    if(typeof(event.data) != 'string') {
        return
    } else if (event.data === 'Ready to receive hostname') {
        console.log('sending hostname')
        var iframe = document.getElementById('oppia-iframe').contentWindow;
        try{
            var message = 'HOSTNAME https://oppiaassistant.web.app'
            iframe.postMessage(message, '*');
        } catch {
            console.log('failed')
        }
    } else {
        scene.currentState = event.data
    }
})


//handshake protocol for oppia. Make sure source is iframe window
// lesson names can just be callbacks
// setcanvas state for the current stuff in eventlistener
