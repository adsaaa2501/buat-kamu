// Navigasi Antar Halaman
function nextPage(pageNumber) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById('page' + pageNumber).classList.add('active');
}

// Membuka Kado & Musik
function openGift() {
    const music = document.getElementById('bg-music');
    music.play().catch(error => console.log("Menunggu interaksi klik pertama."));
    startLeaves();
    nextPage(2);
}

// Validasi Minigame Level 1 (Tebak Hari)
function checkLevel1(isCorrect, element) {
    const feedback = document.getElementById('game-feedback-1');
    const nextBtn = document.getElementById('next-to-level2');
    
    document.querySelectorAll('#page2 .game-card').forEach(card => {
        card.classList.remove('wrong', 'correct');
    });

    if (isCorrect) {
        element.classList.add('correct');
        feedback.innerText = "Yesss bener! Hari ini emang spesial disiapin khusus buat kamu! 🎂";
        feedback.style.color = "#4bff4b";
        nextBtn.classList.remove('hidden-element');
    } else {
        element.classList.add('wrong');
        feedback.innerText = "Yee salah keles, masa lupa hari penting sendiri? Coba lagi! 😜";
        feedback.style.color = "#ff4b4b";
        nextBtn.classList.add('hidden-element');
    }
}

// Validasi Minigame Level 2 (Tebak Angka Keberuntungan)
function checkLevel2(isCorrect, element) {
    const feedback = document.getElementById('game-feedback-2');
    const nextBtn = document.getElementById('next-to-main');
    
    document.querySelectorAll('#page3 .game-card').forEach(card => {
        card.classList.remove('wrong', 'correct');
    });

    if (isCorrect) {
        element.classList.add('correct');
        feedback.innerText = "Wih, instingmu tajam! Angka 9 membawa keberuntungan buat babak utama! Keluarin semua doanya! 🌟";
        feedback.style.color = "#4bff4b";
        nextBtn.classList.remove('hidden-element');
    } else {
        element.classList.add('wrong');
        feedback.innerText = "Zonk! Angka itu gak nyimpen hadiah ucapan. Coba angka hoki yang lain! 🔮";
        feedback.style.color = "#ff4b4b";
        nextBtn.classList.add('hidden-element');
    }
}

// Variabel untuk mengontrol interval pengetikan agar tidak bertabrakan
let typingInterval;

// Membuka Teks Ucapan dengan Efek Mesin Tik (Typing Effect)
function showPopup(title, text) {
    // Tampilkan judul popup langsung
    document.getElementById('popup-title').innerText = title;
    
    const textElement = document.getElementById('popup-text');
    textElement.classList.remove('typing-done');
    textElement.innerText = ""; // Kosongkan teks di awal
    
    document.getElementById('lightbox').classList.add('show-lightbox');
    
    // Hentikan pengetikan sebelumnya jika masih berjalan
    clearInterval(typingInterval);
    
    let index = 0;
    const speed = 40; // Kecepatan mengetik (dalam milidetik per huruf). Makin kecil makin cepat.
    
    // Mulai proses pengetikan huruf demi huruf
    typingInterval = setInterval(() => {
        if (index < text.length) {
            textElement.innerText += text.charAt(index);
            index++;
        } else {
            clearInterval(typingInterval);
            textElement.classList.add('typing-done'); // Menghilangkan kursor kedip setelah selesai
        }
    }, speed);
}

// Menutup Popup Ucapan
function closeLightbox() {
    clearInterval(typingInterval); // Stop ngetik kalau popup buru-buru ditutup
    document.getElementById('lightbox').classList.remove('show-lightbox');
}

// Sistem Hujan Ornamen Partikel
function startLeaves() {
    const container = document.getElementById('leaves-container');
    const emojis = ['🌸', '✨', '🎈', '🎉', '🍀'];
    
    setInterval(() => {
        const leaf = document.createElement('div');
        leaf.classList.add('leaf');
        leaf.innerText = emojis[Math.floor(Math.random() * emojis.length)];
        
        leaf.style.left = Math.random() * 100 + 'vw';
        leaf.style.animationDuration = Math.random() * 3 + 2 + 's';
        leaf.style.opacity = Math.random();
        
        container.appendChild(leaf);
        
        setTimeout(() => {
            leaf.remove();
        }, 5000);
    }, 350);
}