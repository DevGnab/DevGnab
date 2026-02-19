document.addEventListener("DOMContentLoaded", function () {

    // =====================================================
    // HERO BACKGROUND VIDEO
    // =====================================================
    const videoFiles = [
        "assets/videos/Projects/game1.mp4",
        "assets/videos/Projects/game2.mp4",
    ];
    const heroVideo = document.getElementById("hero-video");

    function playRandomSnippet() {
        const randomVideo = videoFiles[Math.floor(Math.random() * videoFiles.length)];
        heroVideo.src = randomVideo;
        heroVideo.onloadedmetadata = function () {
            const duration = heroVideo.duration;
            const startTime = Math.random() * Math.max(0, duration - 10);
            heroVideo.currentTime = startTime;
            heroVideo.play();
            setTimeout(() => fadeOutVideo(playRandomSnippet), 10000);
        };
    }

    function fadeOutVideo(callback) {
        heroVideo.style.opacity = 0;
        setTimeout(() => {
            heroVideo.style.opacity = 1;
            callback();
        }, 1000);
    }

    if (heroVideo) playRandomSnippet();

    // =====================================================
    // PROJECT / SYSTEM CARD VIDEO SNIPPETS
    // =====================================================
    const projectVideos = document.querySelectorAll(".project-video");
    projectVideos.forEach(video => {
        const videoFile = video.dataset.video;
        if (!videoFile) return;

        function playRandomSnippetProject() {
            video.src = videoFile;
            video.onloadedmetadata = function () {
                const startTime = Math.random() * Math.max(0, video.duration - 10);
                video.currentTime = startTime;
                video.play();
                setTimeout(() => fadeOutProjectVideo(playRandomSnippetProject), 10000);
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
    // PROJECT CAROUSEL + THUMBNAILS
    // =====================================================
    const projects = document.querySelectorAll(".project-card");
    const nextProjectBtn = document.getElementById("nextProject");
    const prevProjectBtn = document.getElementById("prevProject");
    const projectsThumbnails = document.getElementById("projects-thumbnails");

    let currentProjectIndex = 0;
    let filteredProjects = [...projects];

    function showProject(index) {
        projects.forEach(p => p.classList.remove("active"));
        if (!filteredProjects[index]) return;
        filteredProjects[index].classList.add("active");
        updateProjectThumbnails();
    }

    function populateProjectThumbnails() {
        if (!projectsThumbnails) return;
        projectsThumbnails.innerHTML = "";
        projects.forEach((proj, index) => {
            const thumbImg = proj.querySelector(".project-image")?.cloneNode(true);
            if (!thumbImg) return;
            if (index === 0) thumbImg.classList.add("active");
            thumbImg.addEventListener("click", () => {
                currentProjectIndex = index;
                filteredProjects = [...projects];
                showProject(currentProjectIndex);
            });
            projectsThumbnails.appendChild(thumbImg);
        });
    }

    function updateProjectThumbnails() {
        if (!projectsThumbnails) return;
        projectsThumbnails.querySelectorAll("img").forEach((img, idx) => {
            img.classList.toggle("active", idx === currentProjectIndex);
        });
    }

    populateProjectThumbnails();
    showProject(0);

    if (nextProjectBtn && prevProjectBtn) {
        nextProjectBtn.addEventListener("click", () => {
            currentProjectIndex = (currentProjectIndex + 1) % filteredProjects.length;
            showProject(currentProjectIndex);
        });
        prevProjectBtn.addEventListener("click", () => {
            currentProjectIndex = (currentProjectIndex - 1 + filteredProjects.length) % filteredProjects.length;
            showProject(currentProjectIndex);
        });
    }

    // =====================================================
    // SYSTEMS CAROUSEL + THUMBNAILS
    // =====================================================
    const systems = document.querySelectorAll(".system-card");
    const nextSystemBtn = document.getElementById("nextSystem");
    const prevSystemBtn = document.getElementById("prevSystem");
    const systemsThumbnails = document.getElementById("systems-thumbnails");

    let currentSystemIndex = 0;

    function showSystem(index) {
        systems.forEach(s => s.classList.remove("active"));
        if (!systems[index]) return;
        systems[index].classList.add("active");
        updateSystemThumbnails();
    }

    function populateSystemThumbnails() {
        if (!systemsThumbnails) return;
        systemsThumbnails.innerHTML = "";
        systems.forEach((sys, index) => {
            const thumbImg = sys.querySelector(".system-image")?.cloneNode(true);
            if (!thumbImg) return;
            if (index === 0) thumbImg.classList.add("active");
            thumbImg.addEventListener("click", () => {
                currentSystemIndex = index;
                showSystem(currentSystemIndex);
            });
            systemsThumbnails.appendChild(thumbImg);
        });
    }

    function updateSystemThumbnails() {
        if (!systemsThumbnails) return;
        systemsThumbnails.querySelectorAll("img").forEach((img, idx) => {
            img.classList.toggle("active", idx === currentSystemIndex);
        });
    }

    populateSystemThumbnails();
    showSystem(0);

    if (nextSystemBtn && prevSystemBtn) {
        nextSystemBtn.addEventListener("click", () => {
            currentSystemIndex = (currentSystemIndex + 1) % systems.length;
            showSystem(currentSystemIndex);
        });
        prevSystemBtn.addEventListener("click", () => {
            currentSystemIndex = (currentSystemIndex - 1 + systems.length) % systems.length;
            showSystem(currentSystemIndex);
        });
    }

    // =====================================================
    // SKILLS CAROUSEL + THUMBNAILS
    // =====================================================
    const skillCards = document.querySelectorAll(".skill-card");
    const skillDetails = document.getElementById("skill-details");
    const skillDescription = document.getElementById("skill-description");
    const skillProjectLinks = document.getElementById("skill-project-links");
    const skillSystemLinks = document.getElementById("skill-system-links");
    const skillsTrack = document.querySelector(".skills-track");
    const prevSkillBtn = document.getElementById("prevSkill");
    const nextSkillBtn = document.getElementById("nextSkill");
    const skillsThumbnails = document.getElementById("skills-thumbnails");

    let skillIndex = 0;
    let visibleSkills = 4;

    function updateVisibleSkills() {
        const width = window.innerWidth;
        if (width <= 500) visibleSkills = 1;
        else if (width <= 900) visibleSkills = 2;
        else visibleSkills = 4;
    }

    window.addEventListener("resize", () => {
        updateVisibleSkills();
        updateSkillsCarousel();
    });

    function updateSkillsCarousel() {
        if (!skillsTrack || skillCards.length === 0) return;
        const cardWidth = skillCards[0].offsetWidth + 20;
        const containerWidth = skillsTrack.parentElement.offsetWidth;
        const visibleCount = Math.round(containerWidth / cardWidth);
        let offsetIndex = 0;
        if (skillIndex > visibleCount - 1) offsetIndex = skillIndex - (visibleCount - 1);
        const maxOffset = skillCards.length - visibleCount;
        offsetIndex = Math.min(offsetIndex, maxOffset);
        skillsTrack.style.transform = `translateX(-${offsetIndex * cardWidth}px)`;     //`
        updateSkillThumbnails();
    }

    function populateSkillThumbnails() {
        if (!skillsThumbnails) return;
        skillsThumbnails.innerHTML = "";
        skillCards.forEach((skill, index) => {
            let thumbImg = skill.querySelector(".skill-icon img")?.cloneNode(true);
            if (!thumbImg) {
                thumbImg = document.createElement("div");
                thumbImg.textContent = skill.querySelector("span")?.textContent?.[0] || "?";
                thumbImg.style.width = "50px";
                thumbImg.style.height = "50px";
                thumbImg.style.display = "flex";
                thumbImg.style.alignItems = "center";
                thumbImg.style.justifyContent = "center";
                thumbImg.style.background = "#ddd";
                thumbImg.style.borderRadius = "5px";
                thumbImg.style.fontWeight = "bold";
                thumbImg.style.cursor = "pointer";
            }
            thumbImg.classList.toggle("active", index === skillIndex);
            thumbImg.addEventListener("click", () => {
                skillIndex = index;
                updateSkillsCarousel();
                activateSkillCard(index);
            });
            skillsThumbnails.appendChild(thumbImg);
        });
    }

    function updateSkillThumbnails() {
        if (!skillsThumbnails) return;
        skillsThumbnails.querySelectorAll("img, div").forEach((img, idx) => {
            img.classList.toggle("active", idx === skillIndex);
        });
    }

    function createSkillLinkButton(type, index) {
        const button = document.createElement("button");
        if (type === "project") {
            button.textContent = projects[index]?.querySelector(".project-name")?.textContent || "Project";
            button.classList.add("project-link");
            button.addEventListener("click", () => {
                currentProjectIndex = index;
                filteredProjects = [...projects];
                showProject(currentProjectIndex);
                document.getElementById("projects").scrollIntoView({ behavior: "smooth" });
            });
        } else if (type === "system") {
            button.textContent = systems[index]?.querySelector(".system-name")?.textContent || "System";
            button.classList.add("project-link");
            button.addEventListener("click", () => {
                currentSystemIndex = index;
                showSystem(currentSystemIndex);
                document.getElementById("systems").scrollIntoView({ behavior: "smooth" });
            });
        }
        return button;
    }

    function activateSkillCard(index) {
        const skill = skillCards[index];
        if (!skill) return;
        skillCards.forEach(s => s.classList.remove("active"));
        skill.classList.add("active");

        skillDescription.textContent = skill.dataset.description || "";

        // Projects
        skillProjectLinks.innerHTML = "";
        const relatedProjects = skill.dataset.projects?.split(",").filter(p => p !== "").map(p => parseInt(p)) || [];
        if (relatedProjects.length === 0) {
            const noProjects = document.createElement("p");
            noProjects.textContent = "No related projects yet.";
            skillProjectLinks.appendChild(noProjects);
        } else {
            relatedProjects.forEach(projectIndex => {
                skillProjectLinks.appendChild(createSkillLinkButton("project", projectIndex));
            });
        }

        // Systems
        skillSystemLinks.innerHTML = "";
        const relatedSystems = skill.dataset.systems?.split(",").filter(s => s !== "").map(s => parseInt(s)) || [];
        if (relatedSystems.length === 0) {
            const noSystems = document.createElement("p");
            noSystems.textContent = "No related systems yet.";
            skillSystemLinks.appendChild(noSystems);
        } else {
            relatedSystems.forEach(systemIndex => {
                skillSystemLinks.appendChild(createSkillLinkButton("system", systemIndex));
            });
        }

        skillDetails.classList.add("open");
    }

    // Initialize skills
    updateVisibleSkills();
    populateSkillThumbnails();
    updateSkillsCarousel();
    activateSkillCard(0);

    if (nextSkillBtn && prevSkillBtn) {
        nextSkillBtn.addEventListener("click", () => {
            skillIndex = (skillIndex + 1) % skillCards.length;
            activateSkillCard(skillIndex);
            requestAnimationFrame(updateSkillsCarousel);
        });
        prevSkillBtn.addEventListener("click", () => {
            skillIndex = (skillIndex - 1 + skillCards.length) % skillCards.length;
            activateSkillCard(skillIndex);
            requestAnimationFrame(updateSkillsCarousel);
        });
    }

    skillCards.forEach((skill, index) => {
        skill.addEventListener("click", () => {
            skillIndex = index;
            updateSkillsCarousel();
            activateSkillCard(index);
        });
    });

});