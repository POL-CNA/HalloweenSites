const scare = document.getElementById("jumpscare");

if (scare) {
    const jumpscareChance = 0.1;

    scare.addEventListener("error", () => {
        console.error("The jumpscare video could not be loaded.", scare.error);
    });

    scare.addEventListener("ended", () => {
        scare.classList.remove("show");
        scare.currentTime = 0;
        scare.muted = false;
    });

    const playJumpscare = () => {
        scare.classList.add("show");

        const hideScare = () => {
            window.setTimeout(() => {
                scare.pause();
                scare.currentTime = 0;
                scare.muted = false;
                scare.classList.remove("show");
            }, 1000 + Math.random() * 1000);
        };

        scare.play().then(hideScare).catch((error) => {
            console.warn("Autoplay with sound was blocked; playing the jumpscare muted.", error);
            scare.muted = true;

            scare.play().then(hideScare).catch((fallbackError) => {
                scare.classList.remove("show");
                console.error("The jumpscare video could not be played.", fallbackError);
            });
        });
    };

    if (Math.random() < jumpscareChance) {
        const delay = 8000 + Math.random() * 17000;
        window.setTimeout(playJumpscare, delay);
    }
}
