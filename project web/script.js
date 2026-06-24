// Teks Surat Minta Maaf Efek Mengetik Otomatis
const titleText = "Maafin Aku Ya, Sayang... ❤️";

const bodyText = "Hai cantiknya aku. Lewat web kecil ini, aku mau minta maaf yang sebesar-besarnya dari lubuk hatiku yang paling dalam.\n\nMaaf banget ya kalau tadi aku kelamaan ninggalin kamu. Maaf kalau kesibukanku bikin kamu ngerasa kesepian, dicuekin, atau harus nunggu kabar dari aku yang lama banget. Aku tahu itu pasti gak enak banget dan bikin kamu kesel.\n\nSama sekali gak ada niatan aku buat bikin kamu ngerasa gak berharga. Makasih banyak ya udah sesabar itu ngadepin aku. Jangan marah lagi ya manis? I love you so much! 🔒";

const sigText = "- Dari Cowokmu Yang Sering Bikin Kangen";

let hasTyped = false; 
let currentPhotoIndex = 0;
let filteredPhotos = [];

// Fungsi Klik Kado
function openGift() {
    const music = document.getElementById('bg-music');
    music.play().catch(err => console.log("Autoplay sukses berjalan."));
    startFallingLeaves();
    navigateToPage('page-game');
}

// Logika Game Tebak Angka
function checkGameChoice(choice) {
    const feedback = document.getElementById('game-feedback');
    const nextBtn = document.getElementById('btn-to-menu');
    
    document.querySelectorAll('.game-card').forEach(card => card.classList.remove('wrong', 'correct'));

    if (choice === 2) {
        document.querySelectorAll('.game-card')[1].classList.add('correct');
        feedback.innerText = "Ih pinter banget! Bener kok ini tanggal lahir aku mwah 🥰❤️";
        feedback.style.color = "#4bff4b";
        nextBtn.classList.remove('hidden-element');
    } else {
        event.currentTarget.classList.add('wrong');
        feedback.innerText = "Yaa salah... Masa tanggal lahir cowok sendiri lupa sih? Coba lagi! 🥺";
        feedback.style.color = "#ff4b4b";
        nextBtn.classList.add('hidden-element');
    }
}

// Fungsi Pindah Halaman & Trigger Mengetik
function navigateToPage(pageId) {
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    const targetPage = document.getElementById(pageId);
    if (targetPage) targetPage.classList.add('active');

    if (pageId === 'page-surat' && !hasTyped) {
        hasTyped = true; 
        typeWriter(titleText, "typewriter-title", 60, () => {
            typeWriter(bodyText, "typewriter-text", 45, () => {
                typeWriter(sigText, "typewriter-sig", 50);
            });
        });
    }
}

// Logika Efek Ketikan
function typeWriter(text, elementId, speed, callback) {
    let i = 0;
    const element = document.getElementById(elementId);
    element.innerHTML = "";
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else if (callback) {
            callback();
        }
    }
    type();
}

// Filter Galeri Foto
function filterGallery(category, event) {
    document.querySelectorAll('.cat-btn').forEach(btn => btn.classList.remove('active'));
    event.currentTarget.classList.add('active');

    document.querySelectorAll('.photo-item').forEach(item => {
        if (category === 'semua' || item.classList.contains(category)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

// PAS FOTO DIKLIK, KELUAR EFEK LEDAKAN HATI & BINTANG KEMUDIAN POP-UP
function handlePhotoClick(index, element, event) {
    const clickX = event.clientX;
    const clickY = event.clientY;

    const particles = ['🌸', '💖', '✨', '❤️', '💝'];
    for (let i = 0; i < 15; i++) {
        const p = document.createElement('div');
        p.classList.add('click-particle');
        p.innerText = particles[Math.floor(Math.random() * particles.length)];
        
        p.style.left = clickX + 'px';
        p.style.top = clickY + 'px';

        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 120 + 60; 
        p.style.setProperty('--x', Math.cos(angle) * velocity + 'px');
        p.style.setProperty('--y', Math.sin(angle) * velocity + 'px');

        document.body.appendChild(p);
        setTimeout(() => { p.remove(); }, 800);
    }

    filteredPhotos = Array.from(document.querySelectorAll('.photo-item')).filter(item => item.style.display !== 'none');
    currentPhotoIndex = filteredPhotos.indexOf(element);
    openLightbox(element.querySelector('img').src, element.querySelector('.photo-caption').innerText);
}

function openLightbox(src, caption) {
    document.getElementById('lightbox-modal').style.display = 'flex';
    document.getElementById('lightbox-img').src = src;
    document.getElementById('lightbox-caption').innerText = caption;
}

function closeLightbox() {
    document.getElementById('lightbox-modal').style.display = 'none';
}

function changePhoto(direction) {
    currentPhotoIndex += direction;
    if (currentPhotoIndex >= filteredPhotos.length) currentPhotoIndex = 0;
    if (currentPhotoIndex < 0) currentPhotoIndex = filteredPhotos.length - 1;

    const targetImg = filteredPhotos[currentPhotoIndex].querySelector('img').src;
    const targetCaption = filteredPhotos[currentPhotoIndex].querySelector('.photo-caption').innerText;
    
    document.getElementById('lightbox-img').src = targetImg;
    document.getElementById('lightbox-caption').innerText = targetCaption;
}

// Efek Kelopak Sakura Gugur
function startFallingLeaves() {
    const container = document.getElementById('leaves-container');
    const items = ['🌸', '✨', '🌸', '💖'];

    setInterval(() => {
        const leaf = document.createElement('div');
        leaf.classList.add('leaf');
        leaf.innerText = items[Math.floor(Math.random() * items.length)];

        leaf.style.left = Math.random() * 100 + 'vw';
        leaf.style.animationDuration = Math.random() * 3 + 3 + 's';
        leaf.style.opacity = Math.random();

        container.appendChild(leaf);
        setTimeout(() => { leaf.remove(); }, 6000);
    }, 400);
}