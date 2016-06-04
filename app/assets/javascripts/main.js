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
  var filterSelect = document.querySelector('select#filter');

  // Put variables in global scope to make them available to the browser console.
  var video = window.video = document.querySelector('video');
  var canvas = window.canvas = document.querySelector('canvas');
  var beardImage = window.beardImage = document.querySelector('img');
  canvas.width = 640;
  canvas.height = 480;
beardImage.width = 192;
beardImage.height = 216;

  snapshotButton.onclick = function() {
    canvas.className = filterSelect.value;
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width,canvas.height);
    canvas.getContext('2d').drawImage(beardImage, canvas.width / 2 - beardImage.width / 2 + 19, canvas.height - beardImage.height, beardImage.width, beardImage.height);
  };

  filterSelect.onchange = function() {
    video.className = filterSelect.value;
  };

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