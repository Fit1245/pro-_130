song="";
song1="";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0;
scoreRightWrist = 0;
status_of_song = song;
status_of_song1 = song1;
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
  if(scoreLeftWrist > 0.2)
{
    circle(leftWristX , leftWristY , 20);
    song.stop();
}
if(status_of_song = false)
{
  song1.play();
  document.getElementById("jote").innerHTML = "song is played  = " + "Peter Pan";
}

if(scoreRightWrist > 0.2)
{
    circle(rightWristX , rightWristY , 20);
    song1.stop();
}
if(status_of_song1 =false)
{
  song.play();
  document.getElementById("jote").innerHTML = "song is played  = " + "Harry Potter";
}
} 
function preload() { 
   song = loadSound("music.mp3");
   song1 = loadSound("music2.mp3");
}

function play() {
song.play();
song.setVolume(1);
song.rate(1);

song1.play();
song1.setVolume(1);
song1.rate(1);
}
function gotposes(results) {
    if(results.length > 0) {
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreleftWrist = " + scoreLeftWrist);
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("scorerightWrist = " + scoreRightWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY  = results[0].pose.rightWrist.y;
        console.log("leftWristX" + leftWristX + "leftWristY" + leftWristY);
        console.log("rightWristX" + rightWristX + "rightWristY" + rightWristY);
    }
}


