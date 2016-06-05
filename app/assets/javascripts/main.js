/*
 *  Copyright (c) 2015 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */

'use strict';
document.addEventListener("DOMContentLoaded", function(event) {
  var snapshotButton = document.querySelector('button#snapshot');
  var saveButton = document.querySelector('button#save-button');
  var retakeButton = document.querySelector('button#retake-button');

  // Put variables in global scope to make them available to the browser console.
  var video = window.video = document.querySelector('video');
  var canvas = window.canvas = document.querySelector('canvas');
  var beardImage = window.beardImage = document.querySelector('img');
  canvas.width = 640;
  canvas.height = 480;
  beardImage.width = 640;
  beardImage.height = 480;

  $(retakeButton).hide();
  $(canvas).hide();
  $(saveButton).hide();

  retakeButton.onclick = function() {
    $(snapshotButton).show();
    $(video).show();
    $(saveButton).hide();
    $(retakeButton).hide();
    $(canvas).hide();
  };

  snapshotButton.onclick = function() {
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width,canvas.height);
    canvas.getContext('2d').drawImage(beardImage, 0, 0, canvas.width, canvas.height);
    $(snapshotButton).hide();
    $(video).hide();
    $(canvas).show();
    $(saveButton).show();
    $(retakeButton).show();
  };

  saveButton.onclick = function() {
    var image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");  // here is the most important part because if you dont replace you will get a DOM 18 exception.
  }

  var constraints = {
    audio: false,
    video: true
  };

  function successCallback(stream) {
    window.stream = stream; // make stream available to browser console
    video.srcObject = stream;
  }

  function errorCallback(error) {
    console.log('navigator.getUserMedia error: ', error);
  }

  navigator.mediaDevices.getUserMedia(
    constraints
  ).then(
    successCallback,
    errorCallback
  );

});
