// Konami Code sequence: ↑ ↑ ↓ ↓ ← → ← → B A
const konamiCode = [
    "ArrowUp", "ArrowUp",
    "ArrowDown", "ArrowDown",
    "ArrowLeft", "ArrowRight",
    "ArrowLeft", "ArrowRight",
    "b", "a"
  ];
  
  let inputSequence = [];
  
  document.addEventListener("keydown", function(event) {
    inputSequence.push(event.key);
  
    // Keep only the last N keys where N is the length of the Konami Code
    if (inputSequence.length > konamiCode.length) {
      inputSequence.shift();
    }
  
    // Check if the input matches the Konami Code
    if (inputSequence.join("") === konamiCode.join("")) {
      activateCheats();
      inputSequence = []; // Reset after activation
    }
  });
  
  function activateCheats() {
    var audio = new Audio('3.1.mp3');
    audio.play();
    window.location.replace("testing-boostra386\test.html");
    alert("Secret Found!");
  }