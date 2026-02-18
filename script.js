document.addEventListener("DOMContentLoaded", function () {

    // =====================================================
    // HERO BACKGROUND VIDEO (Random 10s Snippets Loop)
    // =====================================================
    const videoFiles = [
        "assets/videos/game1.mp4",
        "assets/videos/game2.mp4",
    ];

    const heroVideo = document.getElementById("hero-video");

    function playRandomSnippet() {
        const randomVideo = videoFiles[Math.floor(Math.random() * videoFiles.length)];
        heroVideo.src = randomVideo;

        heroVideo.onloadedmetadata = function () {
            const duration = heroVideo.duration;
            const maxStart = Math.max(0, duration - 10);
            const startTime = Math.random() * maxStart;

            heroVideo.currentTime = startTime;
            heroVideo.play();

            setTimeout(() => {
                fadeOutVideo(playRandomSnippet);
            }, 10000);
        };
    }

    function fadeOutVideo(callback) {
        heroVideo.style.opacity = 0;
        setTimeout(() => {
            heroVideo.style.opacity = 1;
            callback();
        }, 1000);
    }

    if (heroVideo) {
        playRandomSnippet();
    }

    // =====================================================
    // PROJECT CARD VIDEO SNIPPETS
    // =====================================================
    const projectVideos = document.querySelectorAll(".project-video");

    projectVideos.forEach(video => {
        const videoFile = video.dataset.video;
        if (!videoFile) return;

        function playRandomSnippetProject() {
            video.src = videoFile;

            video.onloadedmetadata = function () {
                const duration = video.duration;
                const maxStart = Math.max(0, duration - 10);
                const startTime = Math.random() * maxStart;

                video.currentTime = startTime;
                video.play();

                setTimeout(() => {
                    fadeOutProjectVideo(playRandomSnippetProject);
                }, 10000);
            };
        }

        function fadeOutProjectVideo(callback) {
            video.style.opacity = 0;
            setTimeout(() => {
                video.style.opacity = 1;
                callback();
            }, 1000);
        }

        video.style.transition = "opacity 1s ease";
        playRandomSnippetProject();
    });

    // =====================================================
    // PROJECT CAROUSEL + FILTERING
    // =====================================================
    const projects = document.querySelectorAll(".project-card");
    const nextProjectBtn = document.getElementById("nextProject");
    const prevProjectBtn = document.getElementById("prevProject");

    let currentProjectIndex = 0;
    let filteredProjects = [...projects];

    function showProject(index) {
        projects.forEach(p => p.classList.remove("active"));
        if (!filteredProjects[index]) return;
        filteredProjects[index].classList.add("active");
    }

    // Initialize first project
    if (filteredProjects.length > 0) showProject(0);

    // Carousel buttons
    if (nextProjectBtn && prevProjectBtn) {
        nextProjectBtn.addEventListener("click", () => {
            if (filteredProjects.length === 0) return;
            currentProjectIndex = (currentProjectIndex + 1) % filteredProjects.length;
            showProject(currentProjectIndex);
        });
        prevProjectBtn.addEventListener("click", () => {
            if (filteredProjects.length === 0) return;
            currentProjectIndex = (currentProjectIndex - 1 + filteredProjects.length) % filteredProjects.length;
            showProject(currentProjectIndex);
        });
    }

    // =====================================================
    // SKILLS
    // =====================================================
    const skillCards = document.querySelectorAll(".skill-card"); // only declared once
    const skillDetails = document.getElementById("skill-details");
    const skillDescription = document.getElementById("skill-description");
    const skillProjectLinks = document.getElementById("skill-project-links");

    skillCards.forEach(skill => {
        skill.addEventListener("click", () => {
            // Highlight active skill
            skillCards.forEach(s => s.classList.remove("active"));
            skill.classList.add("active");

            // Show description
            skillDescription.textContent = skill.dataset.description;

            // Clear previous buttons
            skillProjectLinks.innerHTML = "";

            // Related projects
            const relatedProjects = skill.dataset.projects
                .split(",")
                .filter(p => p !== "")
                .map(p => parseInt(p));

            if (relatedProjects.length === 0) {
                const noProjects = document.createElement("p");
                noProjects.textContent = "No related projects yet.";
                skillProjectLinks.appendChild(noProjects);
            } else {
                relatedProjects.forEach(projectIndex => {
                    const button = document.createElement("button");
                    button.textContent = projects[projectIndex]
                        .querySelector(".project-name").textContent;

                    button.addEventListener("click", () => {
                        currentProjectIndex = projectIndex;
                        filteredProjects = [...projects];
                        showProject(currentProjectIndex);
                        document.getElementById("projects")
                            .scrollIntoView({ behavior: "smooth" });
                    });

                    skillProjectLinks.appendChild(button);
                });
            }

            // Open details panel
            skillDetails.classList.add("open");
        });
    });

    // =====================================================
    // SKILL CAROUSEL (Max 4 visible)
    // =====================================================
    const skillsTrack = document.querySelector(".skills-track");
    const prevSkillBtn = document.getElementById("prevSkill");
    const nextSkillBtn = document.getElementById("nextSkill");

    let skillIndex = 0;
    const visibleSkills = 4;

    function updateSkillsCarousel() {
        if (!skillsTrack || skillCards.length === 0) return;
        const cardWidth = skillCards[0].offsetWidth + 20; // gap
        skillsTrack.style.transform = `translateX(-${skillIndex * cardWidth}px)`;
    }

    if (nextSkillBtn && prevSkillBtn) {
        nextSkillBtn.addEventListener("click", () => {
            if (skillIndex < skillCards.length - visibleSkills) {
                skillIndex++;
                updateSkillsCarousel();
            }
        });
        prevSkillBtn.addEventListener("click", () => {
            if (skillIndex > 0) {
                skillIndex--;
                updateSkillsCarousel();
            }
        });
    }

});