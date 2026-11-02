const button = document.getElementById('zombie');
const audio = document.getElementById('scary_music');

button.addEventListener("click", function(){
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
});

var jumpscare = document.getElementById('kingGPTImage');
var jumpcry =document.getElementById('dark');
var jumpaudioDiv = document.getElementById('67jump');



jumpscare.onclick = function(x){
if (jumpaudioDiv.paused) {
    jumpaudioDiv.play();
} else {
    jumpaudioDiv.pause();
}};
       
jumpcry.onclick = function(x){
    if (jumpaudioDiv.paused) {
        jumpaudioDiv.play();
    } else {
        jumpaudioDiv.pause();
    }};
            
