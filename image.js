
song="";

leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0;
scoreRighttWrist = 0;
function change() {
    window.location = "image.html";
}

function setup() {
    canvas = createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video , modelLoaded);
    poseNet.on('pose' , gotposes);
}
function modelLoaded() {
    console.log("poseNet is initilazed");
}
function draw() {
    image(video,0,0,600,500);
    fill('#F0000');
    stroke('#F0000');
    if(scoreLeftWrist > 0.2) {
      circle(leftWristX , leftWristY , 20);
      InNumberleftWrist = Number(leftWristY);
      remove_decimal = floor(InNumberleftWrist);
      volume = remove_decimal/500;
      document.getElementById("volume").innerHTML = "Volume is : " + volume;
      song.setVolume(volume);

      if(scoreRighttWrist > 0.2) 
        circle(rightWristX , rightWristY); 
         if(rightWristY >0 && rightWristY >100) {
            document.getElementById("speed").innerHTML = "speed is " + 0.5;
            song.rate(0.5);
         }
         if(rightWristY >100 && rightWristY >200) {
            document.getElementById("speed").innerHTML = "speed is " + 1;
            song.rate(1);
         }
         if(rightWristY >200 && rightWristY >300) {
            document.getElementById("speed").innerHTML = "speed is " + 1.5;
            song.rate(1.5);
         }
         if(rightWristY >300 && rightWristY >400) {
            document.getElementById("speed").innerHTML = "speed is " + 2;
            song.rate(2);
         }
         if(rightWristY >400 && rightWristY >500) {
            document.getElementById("speed").innerHTML = "speed is " + 2.5;
            song.rate(2.5);
         }
         }
    }

function preload() { 
   song = loadSound("music.mp3");
  }

function play1() {
song.play();
song.setVolume(1);
song.rate(1);
}
function gotposes(results) {
    if(results.length > 0) {
       scoreLeftWrist = results[0].pose.keypoints[9].score;
   scoreRighttWrist = results[0].pose.keypoints[10].score;

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY  = results[0].pose.rightWrist.y;
        console.log("leftWristX" + leftWristX + "leftWristY" + leftWristY);
        console.log("rightWristX" + rightWristX + "rightWristY" + rightWristY);
    }
}

