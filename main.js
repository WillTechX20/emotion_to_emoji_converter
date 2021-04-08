var prediction1Str=null;
var prediction2Str=null;
var cameraDiv=document.querySelector('#camera');
var resultDiv=document.querySelector('#result');

function covertEmotionToEmojiHTMLEntity(emotionStr){
    if(emotionStr=='Happy'){
        return '&#128512;'
    }else if(emotionStr=='Sad'){
        return '&#128542;';
    }else if(emotionStr=='Angry'){
        return '&#128544;';
    }else if(emotionStr=='Confused'){
        return '&#128533;';
    }else{
        return '&#128543;';
    }
}

Webcam.set({width: 350, height: 300, image_format: 'png', png_quality: 90});
Webcam.attach('#camera');

function takeSnapshot(){
    Webcam.snap(function(dataURIStr){
        resultDiv.innerHTML='<img id="captured_img" src="'+dataURIStr+'"/>';
    });
}

console.log('ml5 version:', ml5.version);

function onModelLoaded(){
    console.log('Model Loaded!');
}

var newImgClassifer=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/T4GppfZyY/model.json', onModelLoaded);

function speak(){
    var newSpeechSynthesis=window.speechSynthesis;
    var speechStr1='The first prediction is '+prediction1Str;
    var speechStr2='the second prediction is '+prediction2Str;
    var newSpeechSynthesisUtterance=new SpeechSynthesisUtterance(speechStr1+', and '+speechStr2+'!');

    newSpeechSynthesis.speak(newSpeechSynthesisUtterance);
}

function displayEmojiAndEmotion(error, results){
    if(error){
        console.error(error);
    }else{
        console.log(results);
        document.querySelector('#result_emotion_name_1').innerText=results[0].label;
        document.querySelector('#result_emotion_name_2').innerText=results[1].label;
        document.querySelector('#result_emoji_1').innerHTML=covertEmotionToEmojiHTMLEntity(results[0].label);
        document.querySelector('#result_emoji_2').innerHTML=covertEmotionToEmojiHTMLEntity(results[1].label);
        prediction1Str=results[0].label;
        prediction2Str=results[1].label;
        speak();
        
    }
}

function checkEmotion(){
    var capturedImg=document.querySelector('#captured_img');

    newImgClassifer.classify(capturedImg, displayEmojiAndEmotion);
}