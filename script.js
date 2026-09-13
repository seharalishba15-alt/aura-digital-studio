const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", function () {
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.08)";
        } else {
            navbar.style.boxShadow = "none";
        }
    }
});


// ================================
// CONTACT FORM + FORMSPREE
// ================================

const contactForm = document.getElementById("contactForm");

if (contactForm) {

    contactForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        if (name === "" || email === "" || message === "") {
            alert("Please fill in all fields.");
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        const submitButton = contactForm.querySelector(".submit-button");

        submitButton.innerText = "Sending...";
        submitButton.disabled = true;

        try {

            const formData = new FormData(contactForm);

            const response = await fetch(contactForm.action, {
                method: "POST",
                body: formData,
                headers: {
                    "Accept": "application/json"
                }
            });

            if (response.ok) {

                contactForm.reset();

                submitButton.innerText = "Send Inquiry →";
                submitButton.disabled = false;

                document.getElementById("successPopup").classList.add("show");

            } else {

                throw new Error("Form submission failed");

            }

        } catch (error) {

            submitButton.innerText = "Send Inquiry →";
            submitButton.disabled = false;

            alert("Something went wrong. Please try again.");

        }

    });

}


// ================================
// MOBILE MENU
// ================================

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", function () {
        navLinks.classList.toggle("active");
    });

    const navigationLinks = document.querySelectorAll(".nav-links a");

    navigationLinks.forEach(function (link) {

        link.addEventListener("click", function () {
            navLinks.classList.remove("active");
        });

    });

}


// ================================
// SCROLL REVEAL
// ================================

const revealElements = document.querySelectorAll(
    ".services, .service-card, .work, .work-card, .about, .contact"
);

const revealObserver = new IntersectionObserver(
    function (entries) {

        entries.forEach(function (entry) {

            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }

        });

    },
    {
        threshold: 0.15
    }
);

revealElements.forEach(function (element) {

    element.classList.add("reveal");
    revealObserver.observe(element);

});


// ================================
// DARK / LIGHT THEME
// ================================

const themeToggle = document.getElementById("themeToggle");

if (themeToggle) {

    const savedTheme = localStorage.getItem("aura-theme");

    if (savedTheme === "dark") {

        document.body.classList.add("dark-theme");
        themeToggle.innerText = "☀️";

    }

    themeToggle.addEventListener("click", function () {

        document.body.classList.toggle("dark-theme");

        if (document.body.classList.contains("dark-theme")) {

            themeToggle.innerText = "☀️";
            localStorage.setItem("aura-theme", "dark");

        } else {

            themeToggle.innerText = "🌙";
            localStorage.setItem("aura-theme", "light");

        }

    });

}


// ================================
// SERVICE DETAILS MODAL
// ================================

const serviceModal = document.getElementById("serviceModal");
const modalNumber = document.getElementById("modalNumber");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalFeatures = document.getElementById("modalFeatures");

function openServiceModal(service) {

    if (service === "web") {

        modalNumber.innerText = "01 / SERVICE";
        modalTitle.innerText = "Web Development";

        modalDescription.innerText =
            "We create fast, responsive and modern websites designed around your business goals.";

        modalFeatures.innerHTML = `
            <li>Responsive Website Design</li>
            <li>E-Commerce Development</li>
            <li>Performance Optimization</li>
            <li>SEO-ready Structure</li>
        `;

    }

    else if (service === "uiux") {

        modalNumber.innerText = "02 / SERVICE";
        modalTitle.innerText = "UI / UX Design";

        modalDescription.innerText =
            "We design clean and user-friendly interfaces that make digital products easy and enjoyable to use.";

        modalFeatures.innerHTML = `
            <li>Modern Interface Design</li>
            <li>User-Friendly Layouts</li>
            <li>Mobile & Desktop Design</li>
            <li>Wireframes & Visual Concepts</li>
        `;

    }

    else if (service === "brand") {

        modalNumber.innerText = "03 / SERVICE";
        modalTitle.innerText = "Brand Identity";

        modalDescription.innerText =
            "We create memorable visual identities that help businesses look professional and stand out.";

        modalFeatures.innerHTML = `
            <li>Logo & Visual Identity</li>
            <li>Color & Typography System</li>
            <li>Brand Style Direction</li>
            <li>Professional Brand Presentation</li>
        `;

    }

    serviceModal.classList.add("show");

}


function closeServiceModal() {

    if (serviceModal) {
        serviceModal.classList.remove("show");
    }

}


if (serviceModal) {

    serviceModal.addEventListener("click", function (event) {

        if (event.target === serviceModal) {
            closeServiceModal();
        }

    });

}


document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {
        closeServiceModal();
    }

});


// ================================
// AURA SCROLL PROGRESS
// ================================

window.addEventListener("scroll", function () {

    const scrollTop = window.scrollY;

    const pageHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

    const progress =
        (scrollTop / pageHeight) * 100;

    const scrollProgress =
        document.getElementById("scrollProgress");

    if (scrollProgress) {
        scrollProgress.style.width = progress + "%";
    }

});


// ================================
// ANIMATED STATS
// ================================

const statsSection = document.querySelector(".stats");

let statsAnimated = false;

if (statsSection) {

    const statsObserver = new IntersectionObserver(
        function (entries) {

            if (entries[0].isIntersecting && !statsAnimated) {

                statsAnimated = true;

                animateCounter(
                    document.getElementById("projectsCount"),
                    25,
                    "+"
                );

                animateCounter(
                    document.getElementById("brandsCount"),
                    12
                );

                animateCounter(
                    document.getElementById("passionCount"),
                    100,
                    "%"
                );

            }

        },
        {
            threshold: 0.5
        }
    );

    statsObserver.observe(statsSection);

}


function animateCounter(element, target, suffix = "") {

    if (!element) return;

    let current = 0;

    const increment = target / 40;

    const timer = setInterval(function () {

        current += increment;

        if (current >= target) {

            current = target;
            clearInterval(timer);

        }

        element.innerText =
            Math.floor(current) + suffix;

    }, 30);

}
function closeSuccessPopup() {
    document.getElementById("successPopup").classList.remove("show");
}
// ================================
// PROJECT MODAL
// ================================

const projectModal = document.getElementById("projectModal");

function openProjectModal(project) {

    const category = document.getElementById("projectCategory");
    const title = document.getElementById("projectTitle");
    const description = document.getElementById("projectDescription");
    const services = document.getElementById("projectServices");
    const focus = document.getElementById("projectFocus");

    if (project === "fashion") {

        category.innerText = "01 / E-COMMERCE";
        title.innerText = "Luxury Fashion";
        description.innerText =
            "A premium fashion website designed to create a smooth and modern shopping experience.";
        services.innerText =
            "Web Design · Development · Responsive UI";
        focus.innerText =
            "Premium digital experience";

    }

    else if (project === "branding") {

        category.innerText = "02 / BRANDING";
        title.innerText = "Creative Identity";
        description.innerText =
            "A clean visual identity concept designed to give a modern brand a strong digital presence.";
        services.innerText =
            "Brand Identity · UI Design · Visual Direction";
        focus.innerText =
            "Memorable brand presence";

    }

    else if (project === "business") {

        category.innerText = "03 / DIGITAL";
        title.innerText = "Modern Business";
        description.innerText =
            "A professional business website focused on clarity, trust and a strong online presence.";
        services.innerText =
            "Web Development · UI/UX · Responsive Design";
        focus.innerText =
            "Business growth";

    }

    projectModal.classList.add("show");
}


function closeProjectModal() {

    if (projectModal) {
        projectModal.classList.remove("show");
    }

}


if (projectModal) {

    projectModal.addEventListener("click", function (event) {

        if (event.target === projectModal) {
            closeProjectModal();
        }

    });

}


document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {
        closeProjectModal();
    }

});
// ===== SUCCESS POPUP - OUTSIDE CLICK CLOSE =====
const successPopup = document.getElementById('successPopup');

if (successPopup) {
    successPopup.addEventListener('click', function(event) {
        if (event.target === successPopup) {
            closeSuccessPopup();
        }
    });
}
// WORK CARD CLICK

const workCards = document.querySelectorAll(".work-card");

workCards.forEach(function (card, index) {

    card.addEventListener("click", function () {

        const projects = ["fashion", "branding", "business"];

        openProjectModal(projects[index]);

    });

});
// BACK TO TOP

const backToTop = document.getElementById("backToTop");

if (backToTop) {

    window.addEventListener("scroll", function () {

        if (window.scrollY > 400) {
            backToTop.classList.add("show");
        } else {
            backToTop.classList.remove("show");
        }

    });

    backToTop.addEventListener("click", function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

}