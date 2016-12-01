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
   var shareBanner = document.querySelector('#share-banner');
   var prevBeardButton = document.querySelector('button#prev-beard');
   var nextBeardButton = document.querySelector('button#next-beard');

   // Put variables in global scope to make them available to the browser console.
   var video = window.video = document.querySelector('video');
   var canvas = window.canvas = document.querySelector('canvas');
   var beardImage = window.beardImage = document.getElementsByClassName('beard-image'
 )[0];
   var shutter = new Audio();

   var shutter_ogg = $(".video-container").data('shutter-ogg');
   var shutter_mp3 = $(".video-container").data('shutter-mp3');
   var beard_pngs = $('#beards img').map(function(i, img) {return $(img).attr('src')});

   shutter.autoplay = false;
   shutter.src = navigator.userAgent.match(/Firefox/) ? shutter_ogg : shutter_mp3;
   if(canvas && video) {
     canvas.width = 640;
     canvas.height = 480;
     beardImage.width = 640;
     beardImage.height = 480;

     $(retakeButton).hide();
     $(canvas).hide();
     $(saveButton).hide();
     $(shareBanner).hide();

     nextBeardButton.onclick = function() {
       var currentImageIndex = ~~($(beardImage).attr('src').match(/\d+/));
       var nextImageIndex = (currentImageIndex+1) % beard_pngs.size();

       $(beardImage).attr('src', beard_pngs[nextImageIndex]);
     };

     prevBeardButton.onclick = function() {
       var currentImageIndex = ~~($(beardImage).attr('src').match(/\d+/));
       //check if already at front of list, then go to list-end
       if (currentImageIndex === 0) {
         var prevImageIndex = beard_pngs.size()-1;
       }
       else {
         var prevImageIndex = currentImageIndex-1;
       }
       $(beardImage).attr('src', beard_pngs[prevImageIndex]);
     };

     retakeButton.onclick = function() {
       $(prevBeardButton).show();
       $(nextBeardButton).show();
       $(beardImage).show();
       $(snapshotButton).show();
       $(video).show();
       $(saveButton).hide();
       $(retakeButton).hide();
       $(shareBanner).hide();
       $(canvas).hide();
     };

     snapshotButton.onclick = function() {
       canvas.getContext('2d').drawImage(video, 0, 0, canvas.width,canvas.height);
       canvas.getContext('2d').drawImage(beardImage, 0, 0, canvas.width, canvas.height);
       shutter.play();
       $(prevBeardButton).hide();
       $(nextBeardButton).hide();
       $(beardImage).hide();
       $(snapshotButton).hide();
       $(video).hide();
       $(canvas).show();
       $(saveButton).show();
       $(retakeButton).show();
       $(shareBanner).show();
     };

     saveButton.onclick = function() {
       var image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");  // here is the most important part because if you dont replace you will get a DOM 18 exception.
       $( "body" ).addClass( "loading" );
       $(".container").hide()
           $.ajax({
         url: "/profiles",
         method: 'POST',
         data: {
           profile: {
             image_url: image
           }
         }
       }).done(function(d) {
         console.log('data :' + d);
         console.log("success!");
         $( "html" ).removeClass( "loading" );

       }).fail(function(a){
         console.log(a)
       }).always(function(c){
         console.log("ajax done")
       });
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
   }
 });
