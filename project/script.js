/* Масив фраз для слайдера */
const titles = [
    "Справжній смак кави",
    "Кава, яка надихає",
    "Енергія з першого ковтка"
];

const subtitles = [
    "Насолоджуйся кожною чашкою — від еспресо до лате",
    "Відчуй аромат свіжообсмажених зерен",
    "Зроби свій день кращим із кавою"
];

let index = 0;
const titleEl = document.getElementById("hero-title");
const subtitleEl = document.getElementById("hero-subtitle");

// Автоматична зміна тексту
setInterval(() => {
    index = (index + 1) % titles.length;
    titleEl.textContent = titles[index];
    subtitleEl.textContent = subtitles[index];
}, 4000);

// Smooth scroll
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute("href"))
            .scrollIntoView({ behavior: "smooth" });
    });
});

// Active menu highlight
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav ul li a");

window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(sec => {
        const top = window.scrollY;
        const offset = sec.offsetTop - 150;
        const height = sec.offsetHeight;
        if (top >= offset && top < offset + height) {
            current = sec.getAttribute("id");
        }
    });
    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }
    });
});

document.getElementById("menu-toggle").addEventListener("click", function() {
    document.getElementById("nav-links").classList.toggle("show");
});

// Fade-in on scroll for sections with .reveal-on-scroll
(function () {
    const els = document.querySelectorAll('.reveal-on-scroll');
    if (!('IntersectionObserver' in window) || !els.length) {
        // fallback: show immediately
        els.forEach(el => el.classList.add('in-view'));
        return;
    }

    const io = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    io.unobserve(entry.target); // reveal once
                }
            });
        },
        { root: null, threshold: 0.15 } // start revealing when 15% visible
    );

    els.forEach(el => io.observe(el));
})();
