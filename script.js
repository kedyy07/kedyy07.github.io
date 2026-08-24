/* =========================================
   KEDARNATH PANDA — PORTFOLIO JAVASCRIPT
   ========================================= */


/* =========================================
   TYPING ANIMATION
   ========================================= */

const typingText = document.getElementById("typingText");

const roles = [
    "Web Developer",
    "Programmer",
    "AI Enthusiast",
    "Computer Vision Developer",
    "Problem Solver"
];

let roleIndex = 0;
let characterIndex = 0;
let deleting = false;

function typeEffect() {

    const currentRole = roles[roleIndex];

    if (!deleting) {

        typingText.textContent =
            currentRole.substring(0, characterIndex + 1);

        characterIndex++;

        if (characterIndex === currentRole.length) {

            deleting = true;

            setTimeout(typeEffect, 1500);

            return;
        }

    } else {

        typingText.textContent =
            currentRole.substring(0, characterIndex - 1);

        characterIndex--;

        if (characterIndex === 0) {

            deleting = false;

            roleIndex++;

            if (roleIndex >= roles.length) {
                roleIndex = 0;
            }
        }
    }

    setTimeout(
        typeEffect,
        deleting ? 45 : 85
    );
}

typeEffect();


/* =========================================
   MOBILE NAVIGATION
   ========================================= */

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {

    navLinks.classList.toggle("active");

});


document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("active");

    });

});


/* =========================================
   SCROLL REVEAL
   ========================================= */

const revealElements =
    document.querySelectorAll(".reveal");

const revealObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach(element => {

    revealObserver.observe(element);

});


/* =========================================
   COUNTER ANIMATION
   ========================================= */

const counters =
    document.querySelectorAll(".counter");

const counterObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) return;

                const counter = entry.target;

                const target =
                    Number(counter.dataset.target);

                let current = 0;

                const duration = 1300;

                const increment =
                    target / (duration / 16);

                function updateCounter() {

                    current += increment;

                    if (current >= target) {

                        counter.textContent =
                            target + "+";

                        return;
                    }

                    counter.textContent =
                        Math.floor(current);

                    requestAnimationFrame(
                        updateCounter
                    );
                }

                updateCounter();

                counterObserver.unobserve(counter);

            });

        },
        {
            threshold: 0.6
        }
    );


counters.forEach(counter => {

    counterObserver.observe(counter);

});


/* =========================================
   COPY EMAIL
   ========================================= */

const copyButton =
    document.getElementById("copyEmailBtn");

const emailText =
    document.getElementById("emailText");

copyButton.addEventListener("click", async () => {

    const email =
        emailText.textContent.trim();

    try {

        await navigator.clipboard.writeText(email);

        copyButton.textContent =
            "COPIED ✓";

        copyButton.style.color =
            "#00e5ff";

        setTimeout(() => {

            copyButton.textContent =
                "COPY";

            copyButton.style.color =
                "";

        }, 1800);

    } catch (error) {

        const textArea =
            document.createElement("textarea");

        textArea.value = email;

        document.body.appendChild(textArea);

        textArea.select();

        document.execCommand("copy");

        textArea.remove();

        copyButton.textContent =
            "COPIED ✓";

        setTimeout(() => {

            copyButton.textContent =
                "COPY";

        }, 1800);

    }

});


/* =========================================
   CONTACT FORM
   ========================================= */

const contactForm =
    document.getElementById("contactForm");

const formMessage =
    document.getElementById("formMessage");


contactForm.addEventListener("submit", event => {

    event.preventDefault();

    const name =
        document.getElementById("name").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const subject =
        document.getElementById("subject").value.trim();

    const message =
        document.getElementById("message").value.trim();


    if (!name || !email || !subject || !message) {

        formMessage.textContent =
            "Please fill in all fields.";

        return;

    }


    /*
       Opens the user's default email application.
       The message will be addressed to:
       kedarnathpanda.07@gmail.com
    */

    const recipient =
        "kedarnathpanda.07@gmail.com";

    const mailSubject =
        encodeURIComponent(
            `${subject} — Portfolio Contact`
        );

    const mailBody =
        encodeURIComponent(
            `Hi Kedarnath,\n\n` +
            `${message}\n\n` +
            `Name: ${name}\n` +
            `Email: ${email}`
        );


    window.location.href =
        `mailto:${recipient}?subject=${mailSubject}&body=${mailBody}`;


    formMessage.textContent =
        "Opening your email application...";

});


/* =========================================
   BACK TO TOP
   ========================================= */

const backTop =
    document.getElementById("backTop");


window.addEventListener("scroll", () => {

    if (window.scrollY > 600) {

        backTop.classList.add("show");

    } else {

        backTop.classList.remove("show");

    }

});


backTop.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


/* =========================================
   FOOTER YEAR
   ========================================= */

document.getElementById("year").textContent =
    new Date().getFullYear();


/* =========================================
   CUSTOM CURSOR
   ========================================= */

const cursor =
    document.querySelector(".cursor");

const cursorDot =
    document.querySelector(".cursor-dot");


document.addEventListener("mousemove", event => {

    cursor.style.left =
        `${event.clientX}px`;

    cursor.style.top =
        `${event.clientY}px`;

    cursorDot.style.left =
        `${event.clientX}px`;

    cursorDot.style.top =
        `${event.clientY}px`;

});


document
    .querySelectorAll("a, button, input, textarea")
    .forEach(element => {

        element.addEventListener("mouseenter", () => {

            cursor.classList.add("active");

        });

        element.addEventListener("mouseleave", () => {

            cursor.classList.remove("active");

        });

    });


/* =========================================
   PARTICLE BACKGROUND
   ========================================= */

const particlesContainer =
    document.getElementById("particles");

const particleCount = 35;


for (let i = 0; i < particleCount; i++) {

    const particle =
        document.createElement("span");

    particle.style.position = "absolute";

    particle.style.width =
        `${Math.random() * 2 + 1}px`;

    particle.style.height =
        particle.style.width;

    particle.style.borderRadius =
        "50%";

    particle.style.background =
        "#00e5ff";

    particle.style.opacity =
        `${Math.random() * 0.5 + 0.1}`;

    particle.style.left =
        `${Math.random() * 100}%`;

    particle.style.top =
        `${Math.random() * 100}%`;

    particle.style.boxShadow =
        "0 0 8px rgba(0,229,255,0.7)";

    particle.style.animation =
        `particleFloat ${
            5 + Math.random() * 10
        }s ease-in-out infinite`;

    particle.style.animationDelay =
        `${Math.random() * 5}s`;

    particlesContainer.appendChild(
        particle
    );

}


/* Dynamic particle animation */

const particleStyle =
    document.createElement("style");

particleStyle.textContent = `

@keyframes particleFloat {

    0%, 100% {
        transform: translate(0, 0);
    }

    50% {
        transform:
            translate(
                ${Math.random() * 80 - 40}px,
                ${Math.random() * 80 - 40}px
            );
    }

}

`;

document.head.appendChild(particleStyle);


/* =========================================
   3D TILT EFFECT FOR CARDS
   ========================================= */

document
    .querySelectorAll(".skill-card, .project-card")
    .forEach(card => {

        card.addEventListener("mousemove", event => {

            if (window.innerWidth < 800) return;

            const rect =
                card.getBoundingClientRect();

            const x =
                event.clientX - rect.left;

            const y =
                event.clientY - rect.top;

            const centerX =
                rect.width / 2;

            const centerY =
                rect.height / 2;

            const rotateX =
                ((y - centerY) / centerY) * -2;

            const rotateY =
                ((x - centerX) / centerX) * 2;

            card.style.transform =
                `perspective(800px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateY(-5px)`;

        });


        card.addEventListener("mouseleave", () => {

            card.style.transform = "";

        });

    });


/* =========================================
   NAVBAR SCROLL EFFECT
   ========================================= */

const navbar =
    document.querySelector(".navbar");


window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {

        navbar.style.background =
            "rgba(5,6,10,0.92)";

    } else {

        navbar.style.background =
            "rgba(5,6,10,0.72)";

    }

});
