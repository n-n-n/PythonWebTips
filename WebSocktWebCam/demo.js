
function sendFrameLoop() {
    if (socket == null || socket.readyState != socket.OPEN) {
        return;
    }

    if (1) {
        var canvas = document.createElement('canvas');
	var w = video.width;
	var h = video.height;
        canvas.width = w;
        canvas.height = h;
        var cc = canvas.getContext('2d');
        cc.drawImage(video, 0, 0, w, h);
        var apx = cc.getImageData(0, 0, w, h);

        var dataURL = canvas.toDataURL('image/jpeg', 0.6)

        var msg = {
            'type': 'FRAME',
            'dataURL': dataURL,
        };
        socket.send(JSON.stringify(msg));
    }
}


function createSocket(address, name) {
    socket = new WebSocket(address);
    socketName = name;
    socket.binaryType = "arraybuffer";
    socket.onopen = function() {
        socket.send(JSON.stringify({'type': 'NULL'}));
    }
    socket.onmessage = function(e) {
        console.log(e);
        j = JSON.parse(e.data)
        if (j.type == "NULL") {
	    sendFrameLoop();
	} else if (j.type == "PROCESSED") {
	    sendFrameLoop();
        } else {
            console.log("Unrecognized message type: " + j.type);
        }
    }
    socket.onerror = function(e) {
        console.log("Error creating WebSocket connection to " + address);
        console.log(e);
    }
    socket.onclose = function(e) {

    }
}

