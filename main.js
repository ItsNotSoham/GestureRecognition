Webcam.set({
    width:350,
    height:300,
    image_format:"png",
    png_quality:90
});
camera=document.getElementById("camera");   
Webcam.attach("#camera");
function takepic(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="myimage" src="'+data_uri+'"/>'
    })
}
console.log("ml5version:",ml5.version)
mymodel=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/Im8T-2LPC/model.json',modelLoaded)
function modelLoaded(){
    console.log("Model has loaded")
}
function speak(){
    api=window.speechSynthesis
    bol1="The first gesture is "+prediction1
    bol2="The second gesture is "+prediction2
    utter=new SpeechSynthesisUtterance(bol1+bol2)
    api.speak(utter)
}
function identify(){
    i=document.getElementById("myimage")
    mymodel.classify(i,gotResult)
    
}
function gotResult(error,results){
    if(error){console.log(error)}
    else{
        console.log(results)
        document.getElementById("result_emotion_name").innerHTML=results[0].label
        document.getElementById("result_emotion_name2").innerHTML=results[1].label
        prediction1=results[0].label
        prediction2=results[1].label
        speak()
        if(results[0].label=="Thumbs Up"){document.getElementById("update_emoji_name").innerHTML="&#128077;"}
        if(results[0].label=="Slap"){document.getElementById("update_emoji_name").innerHTML="&#128075;"}
        if(results[0].label=="peace"){document.getElementById("update_emoji_name").innerHTML="&#9996;"}

        if(results[1].label=="Thumbs Up"){document.getElementById("update_emoji_name2").innerHTML="&#128077;"}
        if(results[1].label=="Slap"){document.getElementById("update_emoji_name2").innerHTML="&#128075;"}
        if(results[1].label=="Peace"){document.getElementById("update_emoji_name2").innerHTML="&#9996;"}





    }
}