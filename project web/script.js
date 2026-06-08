let typewriterStarted = false;

function navigateToPage(pageId) {
    const activePage = document.querySelector('.page.active');
    if (activePage) activePage.classList.remove('active');

    setTimeout(() => {
        const targetPage = document.getElementById(pageId);
        if (targetPage) {
            targetPage.classList.add('active');
            if (pageId === 'page-surat' && !typewriterStarted) {
                startTypewriter();
                typewriterStarted = true;
            }
        }
    }, 50);
}

document.getElementById('gift-box').addEventListener('click', function() {
    let yakin = confirm("Hai Cantik! Ada kejutan spesial buat kamu. Buka sekarang?");
    if (yakin) {
        const music = document.getElementById('bg-music');
        music.play().catch(err => console.log("Audio aktif."));
        startFlowerShower();
        navigateToPage('page-game'); 
    } else {
        alert("Jangan dicancel dong, dibuka dulu yuk! 🥺");
    }
});

function checkGameChoice(choiceId) {
    const cards = document.querySelectorAll('.game-card');
    const feedback = document.getElementById('game-feedback');
    const nextBtn = document.getElementById('btn-to-menu');

    cards.forEach(card => card.classList.remove('wrong', 'correct'));

    if (choiceId === 2) {
        cards[1].classList.add('correct');
        feedback.style.color = "#4bff4b";
        feedback.innerText = "Yeyyy tepat banget! Kamu emang paling pintar! ❤️";
        nextBtn.classList.remove('hidden-element');
    } else {
        const index = choiceId === 1 ? 0 : 2;
        cards[index].classList.add('wrong');
        feedback.style.color = "#ff4b4b";
        const salahTexts = [
            "Yahh salah! Coba ingat-ingat tanggal jadian kita 😜",
            "Masa salah sih? Coba pencet kotak yang lain! 🥺",
            "Bukan yang itu sayang, ayo coba tebak lagi!"
        ];
        feedback.innerText = salahTexts[Math.floor(Math.random() * salahTexts.length)];
    }
}

const photoData = [
    { src: "foto1.jpg.webp", caption: "waktu muka cemberut" },
    { src: "foto2.jpg.webp", caption: "random bangett" },
    { src: "foto3.jpg.webp", caption: "senyum favorit aku" },
    { src: "foto4.jpg.webp", caption: "bidadari ya?" }
];

let currentPhotoIndex = 0;

function pemicuEmojiGemas() {
    const lightbox = document.getElementById("lightbox-modal");
    const daftarEmoji = ['🥰', '💖', '✨', '🐣', '🌸', '🐰', '💘', '🧸', '🌹'];
    
    for (let i = 0; i < 15; i++) {
        const emoji = document.createElement('div');
        emoji.classList.add('lightbox-emoji');
        emoji.innerText = daftarEmoji[Math.floor(Math.random() * daftarEmoji.length)];
        
        emoji.style.left = '50%';
        emoji.style.top = '50%';
        
        const sudutJauhX = (Math.random() * 300 - 150) + 'px';
        const sudutJauhY = (Math.random() * 300 - 150) + 'px';
        const rotasiAcak = (Math.random() * 360) + 'deg';
        
        emoji.style.setProperty('--tx', sudutJauhX);
        emoji.style.setProperty('--ty', sudutJauhY);
        emoji.style.setProperty('--rot', rotasiAcak);
        emoji.style.animationDelay = (Math.random() * 0.08) + 's';
        
        lightbox.appendChild(emoji);
        setTimeout(() => { emoji.remove(); }, 1200);
    }
}

function handlePhotoClick(index, element, event) {
    currentPhotoIndex = index;
    updateLightboxContent();
    document.getElementById("lightbox-modal").classList.add("show-lightbox");
    pemicuEmojiGemas();
}

function closeLightbox() {
    document.getElementById("lightbox-modal").classList.remove("show-lightbox");
}

function changePhoto(direction) {
    currentPhotoIndex += direction;
    if (currentPhotoIndex >= photoData.length) currentPhotoIndex = 0;
    if (currentPhotoIndex < 0) currentPhotoIndex = photoData.length - 1;
    
    updateLightboxContent();
    
    const wrapper = document.querySelector('.lightbox-content-wrapper');
    wrapper.style.animation = 'none';
    setTimeout(() => {
        wrapper.style.animation = 'bounceGemas 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards';
    }, 10);
    
    pemicuEmojiGemas();
}

function updateLightboxContent() {
    document.getElementById("lightbox-img").src = photoData[currentPhotoIndex].src;
    document.getElementById("lightbox-caption").innerText = photoData[currentPhotoIndex].caption;
}

function startTypewriter() {
    const titleText = "You are my wildest dream come true.";
    const bodyText = "In a world full of ordinary moments, you are the extraordinary one. The way you laugh, the way you care, the way you simply exist — it fills every corner of my world with something I never knew I needed.";
    const sigText = "— Always yours ♡";
    let i = 0, j = 0, k = 0;

    function typeTitle() {
        if (i < titleText.length) {
            document.getElementById("typewriter-title").innerHTML += titleText.charAt(i);
            i++; setTimeout(typeTitle, 45);
        } else { typeBody(); }
    }
    function typeBody() {
        if (j < bodyText.length) {
            document.getElementById("typewriter-text").innerHTML += bodyText.charAt(j);
            j++; setTimeout(typeBody, 30);
        } else { typeSig(); }
    }
    function typeSig() {
        if (k < sigText.length) {
            document.getElementById("typewriter-sig").innerHTML += sigText.charAt(k);
            k++; setTimeout(typeSig, 45);
        }
    }
    typeTitle();
}

function startFlowerShower() {
    const container = document.getElementById('leaves-container');
    const flowers = ['🌸', '✨', '💖', '🌹'];
    setInterval(() => {
        const leaf = document.createElement('div');
        leaf.classList.add('leaf');
        leaf.innerText = flowers[Math.floor(Math.random() * flowers.length)];
        leaf.style.left = Math.random() * 100 + 'vw';
        leaf.style.animationDuration = Math.random() * 3 + 2.5 + 's';
        container.appendChild(leaf);
        setTimeout(() => { leaf.remove(); }, 5000);
    }, 220);
}

function filterGallery(kategori, event) {
    document.querySelectorAll('.cat-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    document.querySelectorAll('.photo-item').forEach(item => {
        if (kategori === 'semua' || item.classList.contains(kategori)) {
            item.classList.remove('hide');
        } else {
            item.classList.add('hide');
        }
    });
}

document.addEventListener('keydown', function(e) {
    if (document.getElementById("lightbox-modal").classList.contains("show-lightbox")) {
        if (e.key === "Escape") closeLightbox();
        if (e.key === "ArrowRight") changePhoto(1);
        if (e.key === "ArrowLeft") changePhoto(-1);
    }
});