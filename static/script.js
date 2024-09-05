let started = false;
let video, canvas;
var mood_val = 0.5;
var mood_string = 'neutral';

async function setup() {
    console.log("inside setup");
    canvas = createCanvas(640, 480);
    canvas.parent('jumbo-canvas');
    background(255);
    video = createCapture(VIDEO);
    video.hide()

    $('#buttonstyle').hide();
    await faceapi.load
    await faceapi.loadSsdMobilenetv1Model('/static/models/')
    await faceapi.loadFaceExpressionModel('/static/models/');

    document.getElementById("waiting").style.display = "none";
    $('#buttonstyle').show();
    console.log('exiting setup');
    started = true;
}

function draw() {
    if (started) {
        // image(video, 0, 0);
        console.log('whatuppp');
        faceapi.detectAllFaces(video.elt).withFaceExpressions().
            then((allFaces) => {
                background(255);
                image(video, 640, 0, -640, 480);

                for (var faces of allFaces) {
                    let face = faces.detection;
                    console.log(faces)
                    console.log(face.box.width)
                    let small = Math.min(face.box.width, face.box.height);

                    noFill()
                    stroke('#4CAF50');
                    strokeWeight(2);
                    rect(face.box.x, face.box.y, small, small);
                }



                if (allFaces.length > 0) {
                    $('#waiting').hide()
                    $('#buttonstyle').show()
                    // background(255);
                    // image(video, 640, 0, -640, 480);
                    let moods = allFaces[0]['expressions']
                    // console.log(moods);
                    //Get value/per of each moods
                    let angry_per = moods['angry'];
                    let disgusted_per = moods['disgusted'];
                    let happy_per = moods['happy'];
                    let neutral_per = moods['neutral'];
                    let sad_per = moods['sad'];
                    let surprised_per = moods['surprised']
                    //get highest value of mood
                    let highest_val_mood = Object.keys(moods).reduce((a, b) => moods[a] > moods[b] ? a : b)
                    $('#mood_result').text(highest_val_mood);
                    mood_string = highest_val_mood;

                    if (highest_val_mood === 'angry') mood_val = 0.0;

                    else if (highest_val_mood === 'disgusted') mood_val = 0.2

                    else if (highest_val_mood === 'happy') mood_val = 1.0;

                    else if (highest_val_mood === 'sad') mood_val = 0.1;

                    else if (highest_val_mood === 'surprised') mood_val = 0.7;
                }

            },
                (onFailure) => console.log(onFailure));

    }



}


function makespotifyrequest() {

    console.log("Make Spotify Request; mood val: ", mood_val)
    document.getElementById("loadercontainer").style.display = "flex";
    document.getElementById("jumbo-canvas").style.display = "none";
    fetch('/moodify', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 'mood': mood_val, 'mood_string': mood_string })
    }).then(function (response) {
        response.json().then(function (data) {
            url = data['result']
            window.location = window.origin + "/results" + '?' + 'url=' + url
            console.log('window.origin---------------');
            console.log(window.origin);
            console.log(data)
        })
    });
}

