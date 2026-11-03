
const enterBtn = document.getElementById("enterBtn");
const intro = document.getElementById("intro");
const story = document.getElementById("storyContent");

enterBtn.addEventListener("click", function () {
    intro.classList.add("intro-hidden");

    setTimeout(function () {
        story.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }, 300);
});
