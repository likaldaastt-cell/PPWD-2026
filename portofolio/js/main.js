// =====================================================
// TYPING EFFECT
// HANYA NAMA YANG BERGERAK
// =====================================================

const typingText =
    document.getElementById("typing-text");


const name =
    "Lika Lidia Astutik";


let charIndex = 0;

let isDeleting = false;


function typeEffect() {

    if (!isDeleting) {

        typingText.textContent =
            name.substring(
                0,
                charIndex + 1
            );

        charIndex++;

    } else {

        typingText.textContent =
            name.substring(
                0,
                charIndex - 1
            );

        charIndex--;
    }


    let speed =
        isDeleting ? 60 : 100;


    // Nama selesai diketik
    if (
        !isDeleting &&
        charIndex === name.length
    ) {

        speed = 2000;

        isDeleting = true;
    }


    // Nama selesai dihapus
    else if (
        isDeleting &&
        charIndex === 0
    ) {

        isDeleting = false;

        speed = 500;
    }


    setTimeout(
        typeEffect,
        speed
    );
}


typeEffect();


// =====================================================
// PROJECT DATA
// =====================================================

// ================= PROJECT =================

const projects = [
    {
        title: "Website Profil",
        description: "Website profil pribadi menggunakan HTML dan CSS.",
        link: "webprofil/index.html"
    },

    {
        title: "Kalkulator Sederhana",
        description: "Kalkulator sederhana menggunakan HTML, CSS, dan JavaScript.",
        link: "kalkulator/kalkulator_sederhana.html"
    },

    {
        title: "Form Interaktif",
        description: "Formulir interaktif dengan tampilan sederhana.",
        link: "contact.html"
    }
];


const projectGrid = document.getElementById("project-grid");

if (projectGrid) {

    projects.forEach(function(project) {

        const card = document.createElement("div");

        card.className = "project-card";

        card.innerHTML = `
            <div class="project-icon">
                ✦
            </div>

            <h3>${project.title}</h3>

            <p>${project.description}</p>

            <a href="${project.link}" class="project-link">
                Lihat Project →
            </a>
        `;

        projectGrid.appendChild(card);

    });

}