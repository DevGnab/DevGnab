document.addEventListener("DOMContentLoaded", function () {

    // ---------------- Hero Video ----------------
    var videoFiles = [
        "assets/videos/game1.mp4",
    ];

    var video = document.getElementById("hero-video");

    function playRandomSnippet() {
        // Pick a random video
        var randomVideo = videoFiles[Math.floor(Math.random() * videoFiles.length)];
        video.src = randomVideo;

        // Wait for metadata to load
        video.onloadedmetadata = function () {
            var duration = video.duration;
            var maxStart = Math.max(0, duration - 10);
            var startTime = Math.random() * maxStart;
            video.currentTime = startTime;
            video.play();

            // Stop after 10 seconds
            setTimeout(function () {
                fadeOutVideo(playRandomSnippet);
            }, 10000);
        };
    }

    function fadeOutVideo(callback) {
        video.style.opacity = 0;
        setTimeout(function () {
            video.style.opacity = 1; // reset for next video
            callback(); // play next snippet
        }, 1000); // match CSS transition duration
    }

    playRandomSnippet();

    // ---------------- Project Videos ----------------
    var projectVideos = document.querySelectorAll(".project-video");

    projectVideos.forEach(function (video) {
        var videoFile = video.dataset.video; // get selected MP4 for this project
        if (!videoFile) return;

        function playRandomSnippetProject() {
            video.src = videoFile;

            video.onloadedmetadata = function () {
                var duration = video.duration;
                var maxStart = Math.max(0, duration - 10);
                var startTime = Math.random() * maxStart;
                video.currentTime = startTime;
                video.play();

                setTimeout(function () {
                    fadeOutProjectVideo(playRandomSnippetProject);
                }, 10000);
            };
        }

        function fadeOutProjectVideo(callback) {
            video.style.opacity = 0;
            setTimeout(function () {
                video.style.opacity = 1;
                callback();
            }, 1000);
        }

        // Initialize project video
        video.style.transition = "opacity 1s ease";
        playRandomSnippetProject();
    });

    //Aplly font to game titles
    document.querySelectorAll(".project-name").forEach(title => {
        const font = title.dataset.font;
        if (font) title.style.fontFamily = font;
    });

});
