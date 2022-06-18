function setup() {
    canvas = createCanvas(300, 300);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();

    classifier = ml5.imageClassifier('MobileNet', modelLoaded);
}

function draw() {
    image(video, 0, 0, 300, 300);
    classifier.classify(video, gotResults);
}

function modelLoaded() {
    console.log("Model is Loaded");
}

var previousResult = "";

function gotResults(error, results) {
    if (error) {
        console.error(error);
    } else {
        if ((results[0].confidence > 0.5) && (previousResult != results[0].label)) {
            console.log(results);
            previousResult = results[0].label;
            var synth = window.speechSynthesis;
            speakData = "Object detected is " + results[0].label;
            var utterThis = new SpeechSynthesisUtterance(speakData);
            synth.speak(utterThis);

            document.getElementById("result_object_name").innerHTML = results[0].label;
            document.getElementById("result_object_accuracy").innerHTML = results[0].confidence.toFixed(3);
        }
    }
}