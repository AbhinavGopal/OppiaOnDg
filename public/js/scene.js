const view = document.getElementById('view');

window.onload = function() {
    interactiveCanvas.getHeaderHeightPx().then((headerHeight) => {
        document.body.style.paddingTop = `${headerHeight}px`;
    });
}

class Scene {
    constructor() {
        this.action = new Action(this);
        this.action.setCallbacks();
        this.currentState = '';
        return this;
    }

    sendHostname(name) {
        var iframe = document.getElementById('oppia-iframe').contentWindow;
        var message = "HOST_NAME " + name;
        iframe.postMessage(message, '*');
    }

    answerQuestion(message) {
        var completeMessage = currentState + " " + message;
        var iframe = document.getElementById('oppia-iframe').contentWindow;
        iframe.postMessage(completeMessage, "*");
    }


    enterInBox(message) {
        var iframe = document.getElementById('oppia-iframe').contentWindow;
        var message = "ENTER_TEXT_NUMBER_UNITS " + message;
        iframe.postMessage(message, '*');
    }

    continue() {
        //need to post some message to the oppia iframe.
        var iframe = document.getElementById('oppia-iframe');
        iframe.contentWindow.postMessage("CONTINUE", '*');
    }

    submitAnswer() {
        //need to post some message to the oppia iframe.
        var iframe = document.getElementById('oppia-iframe');
        iframe.contentWindow.postMessage("SUBMIT", '*');
    }

    selectItems(numbers) {
        var iframe = document.getElementById('oppia-iframe');
        if (this.currentState == 'SELECT_ITEM_BULLET') {
            var message = "SELECT_ITEM_BULLET " + numbers;
            iframe.contentWindow.postMessage(message, '*');
        } else {
            for (var number of numbers) {
                var message = "SELECT_ITEM_CHECKBOX " + number;
                iframe.contentWindow.postMessage(message, '*');
            }
        }
    }

    enterFraction(fraction) {
        var iframe = document.getElementById('oppia-iframe').contentWindow;
        var message = "ENTER_FRACTION " + fraction;
        iframe.postMessage(message, '*');
    }

    addToSet(items) {
        var iframe = document.getElementById('oppia-iframe').contentWindow;
        var message = "ADD_SET " + items;
        iframe.postMessage(message, '*');
    }

    removeFromSet(items) {
        var iframe = document.getElementById('oppia-iframe').contentWindow;
        for (const item of items) {
            var message = "REMOVE_SET " + item;
            iframe.postMessage(message, '*');
        }
    }

}
scene = new Scene();

window.addEventListener('message', (event) => {
    if(typeof(event.data) != 'string') {
        return;
    } else if (event.data === 'Ready to receive hostname') {
        var iframe = document.getElementById('oppia-iframe').contentWindow;
        var message = 'HOSTNAME https://oppiaassistant.web.app';
        iframe.postMessage(message, '*');
    } else {
        scene.currentState = event.data;
        var textQuery = 'TRIGGER: ' + scene.currentState + ' CHANGE';
        interactiveCanvas.sendTextQuery(textQuery);
    }
})


//handshake protocol for oppia. Make sure source is iframe window
// lesson names can just be callbacks
// setcanvas state for the current stuff in eventlistener
