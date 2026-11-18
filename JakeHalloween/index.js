const jumpscare = document.getElementById("jumpscare1")

function jump(){
    const jumpscare = document.getElementById("jumpscare1")
    jumpscare.style.width = "1000px"
    jumpscare.style.height = "1000px"
    jumpscare.style.display = "block"
        jumpscare.style.backgroundSize = "cover"
        jumpscare.style.zIndex = "1000"

}

function jump1(){
    const jumpscare = document.getElementById("jumpscare1")
    jumpscare.style.width = ""
    jumpscare.style.height = "0px"
    jumpscare.style.display = "none"

        jumpscare.style.zIndex = "1000"

}