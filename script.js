// ================================
// SCROLL EFFECTS (navbar, progress bar, back-to-top)
// ================================

const navbar = document.querySelector(".navbar");
const scrollProgress = document.getElementById("scrollProgress");
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", function () {

    const scrollTop = window.scrollY;

    if (navbar) {
        navbar.style.boxShadow =
            scrollTop > 50 ? "0 10px 30px rgba(0, 0, 0, 0.08)" : "none";
    }

    if (scrollProgress) {
        const pageHeight =
            document.documentElement.scrollHeight -
            document.documentElement.clientHeight;

        scrollProgress.style.width =
            (pageHeight > 0 ? (scrollTop / pageHeight) * 100 : 0) + "%";
    }

    if (backToTop) {
        backToTop.classList.toggle("show", scrollTop > 400);
    }

}, { passive: true });

if (backToTop) {
    backToTop.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}


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

        submitButton.textContent = "Sending...";
        submitButton.disabled = true;

        try {

            const response = await fetch(contactForm.action, {
                method: "POST",
                body: new FormData(contactForm),
                headers: { "Accept": "application/json" }
            });

            if (!response.ok) {
                throw new Error("Form submission failed");
            }

            contactForm.reset();
            document.getElementById("successPopup").classList.add("show");

        } catch (error) {

            alert("Something went wrong. Please try again.");

        } finally {

            submitButton.textContent = "Send Inquiry →";
            submitButton.disabled = false;

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
        const isOpen = navLinks.classList.toggle("active");
        menuToggle.setAttribute("aria-expanded", isOpen);
    });

    navLinks.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
            navLinks.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", "false");
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
    { threshold: 0.15 }
);

revealElements.forEach(function (element) {
    element.classList.add("reveal");
    revealObserver.observe(element);
});


// ================================
// DARK / LIGHT THEME
// ================================

const themeToggle = document.getElementById("themeToggle");

function safeStorage(action, key, value) {
    try {
        return action === "get"
            ? localStorage.getItem(key)
            : localStorage.setItem(key, value);
    } catch (error) {
        return null;
    }
}

if (themeToggle) {

    const savedTheme = safeStorage("get", "aura-theme");

    if (savedTheme === "dark") {
        document.body.classList.add("dark-theme");
        themeToggle.textContent = "☀️";
    }

    themeToggle.addEventListener("click", function () {

        const isDark = document.body.classList.toggle("dark-theme");

        themeToggle.textContent = isDark ? "☀️" : "🌙";
        safeStorage("set", "aura-theme", isDark ? "dark" : "light");

    });

}


// ================================
// SERVICE DETAILS MODAL
// ================================

const services = {
    web: {
        number: "01 / SERVICE",
        title: "Web Development",
        description: "We create fast, responsive and modern websites designed around your business goals.",
        features: [
            "Responsive Website Design",
            "E-Commerce Development",
            "Performance Optimization",
            "SEO-ready Structure"
        ]
    },
    uiux: {
        number: "02 / SERVICE",
        title: "UI / UX Design",
        description: "We design clean and user-friendly interfaces that make digital products easy and enjoyable to use.",
        features: [
            "Modern Interface Design",
            "User-Friendly Layouts",
            "Mobile & Desktop Design",
            "Wireframes & Visual Concepts"
        ]
    },
    brand: {
        number: "03 / SERVICE",
        title: "Brand Identity",
        description: "We create memorable visual identities that help businesses look professional and stand out.",
        features: [
            "Logo & Visual Identity",
            "Color & Typography System",
            "Brand Style Direction",
            "Professional Brand Presentation"
        ]
    }
};

const serviceModal = document.getElementById("serviceModal");

function openServiceModal(key) {

    const service = services[key];

    if (!service || !serviceModal) return;

    document.getElementById("modalNumber").textContent = service.number;
    document.getElementById("modalTitle").textContent = service.title;
    document.getElementById("modalDescription").textContent = service.description;

    document.getElementById("modalFeatures").innerHTML =
        service.features.map(function (feature) {
            return "<li>" + feature + "</li>";
        }).join("");

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


// ================================
// SUCCESS POPUP
// ================================

const successPopup = document.getElementById("successPopup");

function closeSuccessPopup() {
    if (successPopup) {
        successPopup.classList.remove("show");
    }
}

if (successPopup) {
    successPopup.addEventListener("click", function (event) {
        if (event.target === successPopup) {
            closeSuccessPopup();
        }
    });
}


// ================================
// ESCAPE KEY CLOSES POPUPS
// ================================

document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        closeServiceModal();
        closeSuccessPopup();
    }
});


// ================================
// ANIMATED STATS
// ================================

function animateCounter(element, target, suffix) {

    if (!element) return;

    suffix = suffix || "";

    let current = 0;
    const increment = target / 40;

    const timer = setInterval(function () {

        current += increment;

        if (current >= target) {
            current = target;
            clearInterval(timer);
        }

        element.textContent = Math.floor(current) + suffix;

    }, 30);

}

const statsSection = document.querySelector(".stats");

if (statsSection) {

    let statsAnimated = false;

    const statsObserver = new IntersectionObserver(
        function (entries) {

            if (entries[0].isIntersecting && !statsAnimated) {

                statsAnimated = true;

                animateCounter(document.getElementById("projectsCount"), 4);
                animateCounter(document.getElementById("brandsCount"), 4);
                animateCounter(document.getElementById("passionCount"), 100, "%");

            }

        },
        { threshold: 0.5 }
    );

    statsObserver.observe(statsSection);

}
