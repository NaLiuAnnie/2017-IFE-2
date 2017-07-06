(function() {
  // The width and height of the captured photo. We will set the
  // width to the value defined here, but the height will be
  // calculated based on the aspect ratio of the input stream.

  var width = 320;    // We will scale the photo width to this
  var height = 0;     // This will be computed based on the input stream

  // |streaming| indicates whether or not we're currently streaming
  // video from the camera. Obviously, we start at false.

  var streaming = false;

  // The various HTML elements we need to configure or control. These
  // will be set by the startup() function.

  var video = null;
  var canvas = document.getElementsByClassName('canvas');
  var photo = document.getElementsByClassName('photo');;
  var startbutton = null;

  function startup() {
    video = document.getElementById('video');
    startbutton = document.getElementById('startbutton');

    navigator.getMedia = ( navigator.getUserMedia ||
                           navigator.webkitGetUserMedia ||
                           navigator.mozGetUserMedia ||
                           navigator.msGetUserMedia);

    navigator.getMedia(
      {
        video: true,
        audio: false
      },
      function(stream) {
        if (navigator.mozGetUserMedia) {
          video.mozSrcObject = stream;
        } else {
          var vendorURL = window.URL || window.webkitURL;
          video.src = vendorURL.createObjectURL(stream);
        }
        video.play();
      },
      function(err) {
        console.log("An error occured! " + err);
      }
    );

    video.addEventListener('canplay', function(ev){
      if (!streaming) {
        height = video.videoHeight / (video.videoWidth/width);
      
        // Firefox currently has a bug where the height can't be read from
        // the video, so we will make assumptions if this happens.
      
        if (isNaN(height)) {
          height = width / (4/3);
        }
      
        video.setAttribute('width', width);
        video.setAttribute('height', height);
        for(var i = 0; i < canvas.length; i++) {
        canvas[i].setAttribute('width', width);
        canvas[i].setAttribute('height', height);
        }
        streaming = true;
      }
    }, false);

    startbutton.addEventListener('touchstart', function(ev){
      takepicture();
      ev.preventDefault();
    }, false);
    

    setInterval(takepicture, 200);
    clearphoto();
  }

  // Fill the photo with an indication that none has been
  // captured.

  function clearphoto(i) {
    if(typeof i == 'number') {
    var context = canvas[i].getContext('2d');
    context.fillStyle = "#AAA";
    context.fillRect(0, 0, canvas[i].width, canvas[i].height);

    var data = canvas[i].toDataURL('image/png');
    photo[i].setAttribute('src', data);
    }
  }
  
  // Capture a photo by fetching the current contents of the video
  // and drawing it into a canvas, then converting that to a PNG
  // format data URL. By drawing it on an offscreen canvas and then
  // drawing that to the screen, we can change its size and/or apply
  // other changes before drawing it.

  function takepicture() {
    for(var i = 0; i < canvas.length; i++) {
    var context = canvas[i].getContext('2d');
    if (width && height) {
      canvas[i].width = width;
      canvas[i].height = height;
      context.drawImage(video, 0, 0, width, height);
    
      var data = canvas[i].toDataURL('image/png');
      photo[i].setAttribute('src', data);
    } else {
      clearphoto(i);
    }
    }
  }

  // Set up our event listener to run the startup process
  // once loading is complete.
  window.addEventListener('load', startup, false);
})();
