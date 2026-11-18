console.log("SCRIPT LOADED");

const lantern = document.querySelector(".lantern");
console.log(lantern);
const light = document.getElementById("light");
const gravePopup = document.getElementById("gravePopup");
const stepCloserButton = document.getElementById("stepCloserButton");
const lanternParent = lantern?.parentNode;
const lanternNextSibling = lantern?.nextSibling;
const lightParent = light?.parentNode;
const lightNextSibling = light?.nextSibling;
let gravePopupScrollY = 0;

stepCloserButton?.addEventListener("mouseenter", () => {
    light?.classList.add("step-closer-inner-only");
    document.body.style.setProperty("--darkness-radius", "150px");
});
stepCloserButton?.addEventListener("mouseleave", () => {
    light?.classList.remove("step-closer-inner-only");
    document.body.style.setProperty("--darkness-radius", "300px");
});

if (gravePopup) {
    document.getElementById("stepBackButton")?.addEventListener("click", hidegrave);
    gravePopup.addEventListener("close", () => {
        if (lantern && lanternParent) {
            lanternParent.insertBefore(
                lantern,
                lanternNextSibling?.parentNode === lanternParent ? lanternNextSibling : null
            );
        }
        if (light && lightParent) {
            light.classList.remove("popup-inner-only");
            lightParent.insertBefore(
                light,
                lightNextSibling?.parentNode === lightParent ? lightNextSibling : null
            );
        }
        document.body.style.setProperty("--darkness-radius", "300px");
        requestAnimationFrame(() => {
            window.scrollTo(0, gravePopupScrollY);
        });
    });
} else {
    const graveImage = document.getElementById("Grave");
    graveImage?.addEventListener("click", hidegrave);
}

document.addEventListener("mousemove", (e) => {
    document.body.style.setProperty("--lantern-x", e.clientX + "px");
    document.body.style.setProperty("--lantern-y", e.clientY + "px");

    lantern.style.left = e.clientX + "px";
    lantern.style.top = e.clientY + "px";

    light.style.left = e.clientX + "px";
    light.style.top = e.clientY + "px";
});

function showgrave() {
    gravePopupScrollY = window.scrollY;

    if (gravePopup) {
        if (light) {
            light.classList.add("popup-inner-only");
            gravePopup.appendChild(light);
        }
        document.body.style.setProperty("--darkness-radius", "150px");
        if (lantern) {
            gravePopup.appendChild(lantern);
        }
        gravePopup.showModal();
        return;
    }

    document.getElementById("Grave").style.display = "block";
    const closeButton = document.getElementById("closeButton");
    if (closeButton) {
        closeButton.style.display = "block";
    }
}

function hidegrave() {
    if (gravePopup?.open) {
        gravePopup.close();
    } else {
        const graveImage = document.getElementById("Grave");
        if (graveImage) {
            graveImage.style.display = "none";
        }
        const closeButton = document.getElementById("closeButton");
        if (closeButton) {
            closeButton.style.display = "none";
        }
        requestAnimationFrame(() => {
            window.scrollTo(0, gravePopupScrollY);
        });
    }
}

