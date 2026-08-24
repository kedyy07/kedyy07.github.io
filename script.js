/* =========================================================
   KEDARNATH PANDA — PORTFOLIO ENGINE V2
========================================================= */


/* =========================================================
   CONFIG
========================================================= */

const CONFIG = {

    githubUsername: "kedyy07",

    email: "kedarnathpanda.07@gmail.com",

    leetcode: {
        solved: "251+",
        easy: "120+",
        medium: "110+",
        hard: "20+"
    }

};


/* =========================================================
   LOADER
========================================================= */

const loader = document.getElementById("loader");
const loaderProgress =
    document.getElementById("loaderProgress");

let progress = 0;

const loaderInterval =
    setInterval(() => {

        progress += Math.random() * 15;

        if (progress >= 100) {

            progress = 100;

            clearInterval(loaderInterval);

            setTimeout(() => {

                loader.classList.add("hidden");

            }, 350);

        }

        loaderProgress.style.width =
            `${progress}%`;

    }, 120);


/* =========================================================
   MOBILE NAV
========================================================= */

const menuBtn =
    document.getElementById("menuBtn");

const nav =
    document.getElementById("nav");


menuBtn.addEventListener("click", () => {

    nav.classList.toggle("open");

    menuBtn.textContent =
        nav.classList.contains("open")
            ? "✕"
            : "☰";

});


document.querySelectorAll(".nav-link")
    .forEach(link => {

        link.addEventListener("click", () => {

            nav.classList.remove("open");

            menuBtn.textContent = "☰";

        });

    });


/* =========================================================
   TYPING ENGINE
========================================================= */

const typing =
    document.getElementById("typing");

const phrases = [
    "developer.",
    "AI enthusiast.",
    "problem solver.",
    "computer vision builder.",
    "web developer.",
    "future engineer."
];

let phrase = 0;
let char = 0;
let deleting = false;


function typeLoop() {

    const current =
        phrases[phrase];

    if (!deleting) {

        typing.textContent =
            current.substring(
                0,
                char + 1
            );

        char++;

        if (char >= current.length) {

            deleting = true;

            setTimeout(
                typeLoop,
                1400
            );

            return;

        }

    } else {

        typing.textContent =
            current.substring(
                0,
                char - 1
            );

        char--;

        if (char <= 0) {

            char = 0;

            deleting = false;

            phrase =
                (phrase + 1) %
                phrases.length;

        }

    }

    setTimeout(
        typeLoop,
        deleting ? 35 : 70
    );

}

typeLoop();


/* =========================================================
   THEME
========================================================= */

const themeBtn =
    document.getElementById("themeBtn");

const savedTheme =
    localStorage.getItem(
        "kedarnath-theme"
    );


if (savedTheme === "light") {

    document.body.classList.add("light");

    themeBtn.textContent = "☾";

}


themeBtn.addEventListener(
    "click",
    () => {

        document.body.classList.toggle(
            "light"
        );

        const isLight =
            document.body.classList.contains(
                "light"
            );

        themeBtn.textContent =
            isLight ? "☾" : "☼";

        localStorage.setItem(
            "kedarnath-theme",
            isLight
                ? "light"
                : "dark"
        );

    }
);


/* =========================================================
   PARTICLE BACKGROUND
========================================================= */

const canvas =
    document.getElementById("particles");

const ctx =
    canvas.getContext("2d");

let particles = [];

function resizeCanvas() {

    canvas.width =
        window.innerWidth;

    canvas.height =
        window.innerHeight;

}

resizeCanvas();

window.addEventListener(
    "resize",
    resizeCanvas
);


function createParticles() {

    particles = [];

    const amount =
        Math.min(
            100,
            Math.floor(
                window.innerWidth / 14
            )
        );

    for (
        let i = 0;
        i < amount;
        i++
    ) {

        particles.push({

            x:
                Math.random() *
                canvas.width,

            y:
                Math.random() *
                canvas.height,

            size:
                Math.random() * 1.5 + .3,

            speed:
                Math.random() * .25 + .05,

            opacity:
                Math.random() * .5 + .1

        });

    }

}

createParticles();


function drawParticles() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    particles.forEach(p => {

        p.y -= p.speed;

        if (p.y < -5) {

            p.y =
                canvas.height + 5;

        }

        ctx.beginPath();

        ctx.arc(
            p.x,
            p.y,
            p.size,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            `rgba(0,229,255,${p.opacity})`;

        ctx.fill();

    });

    requestAnimationFrame(
        drawParticles
    );

}

drawParticles();


/* =========================================================
   ANIMATED COUNTERS
========================================================= */

const counterElements =
    document.querySelectorAll(
        "[data-count]"
    );


const counterObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (
                    !entry.isIntersecting
                ) {
                    return;
                }

                const element =
                    entry.target;

                const target =
                    Number(
                        element.dataset.count
                    );

                let current = 0;

                const duration = 1200;

                const start =
                    performance.now();


                function animate(now) {

                    const progress =
                        Math.min(
                            (now - start) /
                            duration,
                            1
                        );

                    current =
                        Math.floor(
                            target *
                            (1 -
                                Math.pow(
                                    1 - progress,
                                    3
                                ))
                        );

                    element.textContent =
                        current +
                        (
                            target === 56
                                ? "K+"
                                : "+"
                        );

                    if (
                        progress < 1
                    ) {

                        requestAnimationFrame(
                            animate
                        );

                    }

                }

                requestAnimationFrame(
                    animate
                );

                counterObserver.unobserve(
                    element
                );

            });

        },
        {
            threshold: .6
        }
    );


counterElements.forEach(
    element =>
        counterObserver.observe(element)
);


/* =========================================================
   GITHUB API
========================================================= */

const githubProjects =
    document.getElementById(
        "githubProjects"
    );

const githubStatus =
    document.getElementById(
        "githubStatus"
    );

const githubError =
    document.getElementById(
        "githubError"
    );


const repoCount =
    document.getElementById(
        "repoCount"
    );

const followersCount =
    document.getElementById(
        "followersCount"
    );

const followingCount =
    document.getElementById(
        "followingCount"
    );


async function loadGitHub() {

    try {

        const userResponse =
            await fetch(
                `https://api.github.com/users/${CONFIG.githubUsername}`
            );

        if (
            !userResponse.ok
        ) {
            throw new Error(
                "GitHub user request failed"
            );
        }

        const user =
            await userResponse.json();


        repoCount.textContent =
            user.public_repos ?? "—";

        followersCount.textContent =
            user.followers ?? "—";

        followingCount.textContent =
            user.following ?? "—";


        const repoResponse =
            await fetch(
                `https://api.github.com/users/${CONFIG.githubUsername}/repos?sort=updated&direction=desc&per_page=12`
            );

        if (
            !repoResponse.ok
        ) {
            throw new Error(
                "GitHub repository request failed"
            );
        }

        const repos =
            await repoResponse.json();


        renderRepositories(
            repos
                .filter(repo =>
                    !repo.fork
                )
                .slice(0, 6)
        );


        githubStatus.innerHTML =
            `<span class="green">●</span>
             Live public repositories`;

    } catch (error) {

        console.error(
            "GitHub error:",
            error
        );

        githubStatus.classList.add(
            "hidden"
        );

        githubError.classList.remove(
            "hidden"
        );

    }

}


function escapeHTML(value) {

    const div =
        document.createElement("div");

    div.textContent =
        value ?? "";

    return div.innerHTML;

}


function renderRepositories(
    repos
) {

    if (!repos.length) {

        githubProjects.innerHTML = `
            <div class="github-error">
                No public repositories found yet.
            </div>
        `;

        return;

    }


    githubProjects.innerHTML =
        repos.map(repo => {

            const description =
                repo.description ||
                "No description provided.";

            const language =
                repo.language ||
                "Code";

            return `

                <article class="repo-card">

                    <div class="repo-top">

                        <div class="repo-icon">
                            &lt;/&gt;
                        </div>

                        <a
                            class="repo-link"
                            href="${repo.html_url}"
                            target="_blank"
                            rel="noopener"
                            aria-label="Open repository"
                        >
                            ↗
                        </a>

                    </div>


                    <h3>
                        ${escapeHTML(repo.name)}
                    </h3>


                    <p>
                        ${escapeHTML(description)}
                    </p>


                    <div class="repo-meta">

                        <span class="repo-language">
                            ● ${escapeHTML(language)}
                        </span>

                        <span>
                            ★ ${repo.stargazers_count}
                        </span>

                        <span>
                            ⑂ ${repo.forks_count}
                        </span>

                    </div>

                </article>

            `;

        }).join("");

}


loadGitHub();


/* =========================================================
   INTERACTIVE TERMINAL
========================================================= */

const terminalForm =
    document.getElementById(
        "terminalForm"
    );

const terminalInput =
    document.getElementById(
        "terminalInput"
    );

const terminalOutput =
    document.getElementById(
        "terminalOutput"
    );


const commands = {

    help: `
Available commands:

  about       → Who is Kedarnath?
  skills      → View technical skills
  projects    → View projects
  github      → Open GitHub
  leetcode    → Open LeetCode
  contact     → Contact information
  clear       → Clear terminal
  date        → Current date

Try them. 🚀
`,

    about: `
Kedarnath Panda

Developer + AI enthusiast + problem solver.

Interested in:
• Web development
• Artificial intelligence
• Computer vision
• Algorithms
• Open source

Currently: building things and learning.
`,

    skills: `
Technical stack:

Frontend
→ HTML
→ CSS
→ JavaScript

Programming
→ Python
→ C++

AI / CV
→ YOLO
→ OpenCV

Tools
→ Git
→ GitHub
→ VS Code
`,

    projects: `
Featured projects:

01 → Fire & Smoke Detection
     YOLO + Python + OpenCV

02 → Hand Gesture Tic-Tac-Toe
     Python + OpenCV + MediaPipe

03 → Web Development Projects
     HTML + CSS + JavaScript
`,

    github: `
Opening GitHub...
`,

    leetcode: `
Opening LeetCode...
`,

    contact: `
Email:
${CONFIG.email}

Use the contact form below.
`,

    date: `
System date:
${new Date().toLocaleDateString(
    undefined,
    {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    }
)}
`

};


function addTerminalLine(
    content,
    className = ""
) {

    const line =
        document.createElement("div");

    line.className =
        className;

    line.textContent =
        content;

    terminalOutput.appendChild(
        line
    );

    terminalOutput.scrollTop =
        terminalOutput.scrollHeight;

}


terminalForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();

        const command =
            terminalInput.value
                .trim()
                .toLowerCase();

        if (!command) {
            return;
        }


        addTerminalLine(
            `guest@portfolio:~$ ${command}`,
            "muted"
        );


        terminalInput.value = "";


        if (
            command === "clear"
        ) {

            terminalOutput.innerHTML = "";

            return;

        }


        if (
            command === "github"
        ) {

            addTerminalLine(
                "Opening GitHub..."
            );

            setTimeout(() => {

                window.open(
                    "https://github.com/kedyy07",
                    "_blank"
                );

            }, 300);

            return;

        }


        if (
            command === "leetcode"
        ) {

            addTerminalLine(
                "Opening LeetCode..."
            );

            setTimeout(() => {

                window.open(
                    "https://leetcode.com/",
                    "_blank"
                );

            }, 300);

            return;

        }


        if (
            commands[command]
        ) {

            addTerminalLine(
                commands[command]
            );

        } else {

            addTerminalLine(
                `Command not found: ${command}

Type "help" for available commands.`
            );

        }

    }
);


/* =========================================================
   COPY EMAIL
========================================================= */

const copyEmail =
    document.getElementById(
        "copyEmail"
    );

const toast =
    document.getElementById(
        "toast"
    );

const emailText =
    document.getElementById(
        "emailText"
    );


emailText.textContent =
    CONFIG.email;


copyEmail.addEventListener(
    "click",
    async () => {

        try {

            await navigator.clipboard.writeText(
                CONFIG.email
            );

            showToast(
                "✓ Email copied"
            );

        } catch {

            showToast(
                "Unable to copy"
            );

        }

    }
);


function showToast(message) {

    toast.textContent =
        message;

    toast.classList.add(
        "show"
    );

    setTimeout(() => {

        toast.classList.remove(
            "show"
        );

    }, 1800);

}


/* =========================================================
   CONTACT FORM
========================================================= */

const contactForm =
    document.getElementById(
        "contactForm"
    );

const formMessage =
    document.getElementById(
        "formMessage"
    );


contactForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();


        const name =
            document.getElementById(
                "name"
            ).value.trim();

        const email =
            document.getElementById(
                "email"
            ).value.trim();

        const subject =
            document.getElementById(
                "subject"
            ).value.trim();

        const message =
            document.getElementById(
                "message"
            ).value.trim();


        if (
            !name ||
            !email ||
            !subject ||
            !message
        ) {

            formMessage.textContent =
                "Please complete every field.";

            return;

        }


        const mailSubject =
            encodeURIComponent(
                subject
            );


        const mailBody =
            encodeURIComponent(
                `Hello Kedarnath,

${message}

Name: ${name}
Email: ${email}`
            );


        formMessage.textContent =
            "Opening your email client...";


        window.location.href =
            `mailto:${CONFIG.email}?subject=${mailSubject}&body=${mailBody}`;

    }
);


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements =
    document.querySelectorAll(
        ".skill-card, .featured-card, .timeline-item, .repo-card"
    );


revealElements.forEach(
    element => {

        element.style.opacity = "0";

        element.style.transform =
            "translateY(25px)";

        element.style.transition =
            "opacity .65s ease, transform .65s ease";

    }
);


const revealObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (
                    !entry.isIntersecting
                ) {
                    return;
                }


                entry.target.style.opacity =
                    "1";

                entry.target.style.transform =
                    "translateY(0)";


                revealObserver.unobserve(
                    entry.target
                );

            });

        },
        {
            threshold: .12
        }
    );


revealElements.forEach(
    element =>
        revealObserver.observe(element)
);


/* =========================================================
   ACTIVE NAV
========================================================= */

const sections =
    document.querySelectorAll(
        "section[id]"
    );

const navLinks =
    document.querySelectorAll(
        ".nav-link"
    );


const navObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (
                    !entry.isIntersecting
                ) {
                    return;
                }


                navLinks.forEach(link => {

                    link.classList.remove(
                        "active"
                    );


                    if (
                        link.getAttribute(
                            "href"
                        ) ===
                        `#${entry.target.id}`
                    ) {

                        link.classList.add(
                            "active"
                        );

                    }

                });

            });

        },
        {
            threshold: .25
        }
    );


sections.forEach(
    section =>
        navObserver.observe(section)
);


/* =========================================================
   TOP BUTTON
========================================================= */

const topBtn =
    document.getElementById(
        "topBtn"
    );


window.addEventListener(
    "scroll",
    () => {

        if (
            window.scrollY > 600
        ) {

            topBtn.classList.add(
                "show"
            );

        } else {

            topBtn.classList.remove(
                "show"
            );

        }

    }
);


topBtn.addEventListener(
    "click",
    () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }
);


/* =========================================================
   CARD TILT
========================================================= */

document.querySelectorAll(
    ".skill-card, .featured-card, .repo-card"
).forEach(card => {

    card.addEventListener(
        "mousemove",
        event => {

            if (
                window.innerWidth < 850
            ) {
                return;
            }


            const rect =
                card.getBoundingClientRect();


            const x =
                event.clientX -
                rect.left;

            const y =
                event.clientY -
                rect.top;


            const rotateX =
                ((y -
                    rect.height / 2) /
                    (rect.height / 2)) *
                -2;


            const rotateY =
                ((x -
                    rect.width / 2) /
                    (rect.width / 2)) *
                2;


            card.style.transform =
                `
                translateY(-6px)
                perspective(900px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                `;

        }
    );


    card.addEventListener(
        "mouseleave",
        () => {

            card.style.transform =
                "";

        }
    );

});


/* =========================================================
   CONSOLE EASTER EGG
========================================================= */

console.log(
    "%c🚀 KedarnathOS",
    "font-size:24px;font-weight:bold;color:#00e5ff"
);

console.log(
    "%cWelcome, curious developer.",
    "font-size:14px;color:#8b5cf6"
);

console.log(
    "%cTry the terminal on the website.",
    "font-size:12px;color:#38f59b"
);
