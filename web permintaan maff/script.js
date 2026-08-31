document.addEventListener("DOMContentLoaded", function () {
    const audio = document.getElementById("bgm");
    const playBtn = document.getElementById("playBtn");

    // Continuous Rain Flower Effect
    function startFlowerShower() {
        const flowers = ['🌸', '🌺', '🌹', '✨', '💖', '🌼', '🌷'];
        setInterval(() => {
            const flower = document.createElement('div');
            flower.className = 'flower-particle';
            flower.innerText = flowers[Math.floor(Math.random() * flowers.length)];
            flower.style.left = Math.random() * 100 + 'vw';
            flower.style.animationDuration = (Math.random() * 3 + 4) + 's';
            flower.style.fontSize = (Math.random() * 10 + 14) + 'px';
            document.body.appendChild(flower);

            setTimeout(() => { flower.remove(); }, 7000);
        }, 300);
    }
    startFlowerShower();

    /* ================= 1. GAME TANGKAP HATI ================= */
    let score = 0;
    const heartTarget = document.getElementById("heartTarget");
    const scoreText = document.getElementById("scoreText");
    const gameArea = document.getElementById("gameArea");

    function moveHeart() {
        const maxX = gameArea.clientWidth - 50;
        const maxY = gameArea.clientHeight - 50;
        const randomX = Math.floor(Math.random() * maxX);
        const randomY = Math.floor(Math.random() * maxY);

        heartTarget.style.left = randomX + "px";
        heartTarget.style.top = randomY + "px";
    }

    moveHeart();

    heartTarget.addEventListener("click", function () {
        score++;
        scoreText.innerText = `Skor: ${score} / 3`;
        if (score < 3) {
            moveHeart();
        } else {
            document.getElementById("gameStage").classList.remove("active");
            document.getElementById("giftStage").classList.add("active");
        }
    });

    /* ================= 2. GIFT STAGE & MUSIC ================= */
    const giftWrapper = document.getElementById("giftWrapper");
    giftWrapper.addEventListener("click", function () {
        document.getElementById("giftStage").classList.remove("active");
        document.getElementById("mainStage").classList.add("active");

        audio.play().then(() => { playBtn.innerText = "❚❚"; }).catch(e => {});
        startTypewriter();
    });

    playBtn.addEventListener("click", function () {
        if (audio.paused) {
            audio.play();
            playBtn.innerText = "❚❚";
        } else {
            audio.pause();
            playBtn.innerText = "▶";
        }
    });

    /* ================= 3. TYPEWRITER EFFECT ================= */
    const fullText = "Sayang, I know I've hurt you, and honestly that's the last thing I ever wanted to do. Maaf kalau tadi ada kata-kata atau sikap aku yang bikin hati kamu capek.\n\nKadang aku terlalu sibuk sama pikiran sendiri sampai lupa ada hati kamu yang harus aku jaga baik-baik. I love you so much, dan aku ga mau bikin kamu sedih lagi. 🥺❤️";
    let typeIndex = 0;
    let isTyped = false;

    function startTypewriter() {
        if (isTyped) return;
        isTyped = true;
        const target = document.getElementById("typewriterText");
        target.innerHTML = "";

        function type() {
            if (typeIndex < fullText.length) {
                let char = fullText.charAt(typeIndex);
                if (char === "\n") {
                    target.innerHTML += "<br>";
                } else {
                    target.innerHTML += char;
                }
                typeIndex++;
                setTimeout(type, 35);
            }
        }
        type();
    }

    /* ================= 4. MULTI-SLIDE CONTROL ================= */
    let currentSlide = 1;
    const totalSlides = 5;
    let isForgiven = false; // Status apakah tombol "Mau" sudah dipencet

    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    const slideIndicator = document.getElementById("slideIndicator");

    function updateSlides() {
        for (let i = 1; i <= totalSlides; i++) {
            document.getElementById(`slide${i}`).classList.remove("active");
        }
        document.getElementById(`slide${currentSlide}`).classList.add("active");
        slideIndicator.innerText = `${currentSlide} / ${totalSlides}`;

        // Tombol Prev
        prevBtn.disabled = (currentSlide === 1);

        // Kunci tombol Next di Slide 4 kalau belum dipencet "Mau Banget!"
        if (currentSlide === 4 && !isForgiven) {
            nextBtn.disabled = true;
        } else if (currentSlide === totalSlides) {
            nextBtn.disabled = true;
        } else {
            nextBtn.disabled = false;
        }
    }

    nextBtn.addEventListener("click", () => {
        if (currentSlide < totalSlides) {
            if (currentSlide === 4 && !isForgiven) return; // Prevent next jika belum mau
            currentSlide++;
            updateSlides();
        }
    });

    prevBtn.addEventListener("click", () => {
        if (currentSlide > 1) {
            currentSlide--;
            updateSlides();
        }
    });

    /* ================= 5. GARDEN PROMISES ================= */
    const promisePopup = document.getElementById("promisePopup");
    document.querySelectorAll(".flower-item").forEach(flower => {
        flower.addEventListener("click", function () {
            promisePopup.innerText = this.getAttribute("data-promise");
            promisePopup.style.display = "block";
        });
    });

    /* ================= 6. GAME TOMBOL "ENGGA" & AUTO SLIDE ================= */
    const btnNo = document.getElementById("btnNo");
    const btnYes = document.getElementById("btnYes");
    let noClickCount = 0;

    function dodgeButton() {
        noClickCount++;
        if (noClickCount >= 3) {
            btnNo.innerText = "MAAFIN MAAFIN! 💖";
            btnNo.classList.remove("btn-no");
            btnNo.classList.add("btn-yes");
            btnNo.style.position = "static";
            btnNo.onclick = acceptApology;
            return;
        }

        const x = Math.random() * 140 - 70;
        const y = Math.random() * 100 - 50;
        btnNo.style.transform = `translate(${x}px, ${y}px)`;
    }

    btnNo.addEventListener("mouseover", dodgeButton);
    btnNo.addEventListener("click", dodgeButton);

    function acceptApology() {
        isForgiven = true;
        
        // Efek Ledakan Hati
        for (let i = 0; i < 30; i++) {
            setTimeout(() => {
                const p = document.createElement('div');
                p.className = 'flower-particle';
                p.innerText = '💖';
                p.style.left = Math.random() * 100 + 'vw';
                p.style.animationDuration = '3s';
                p.style.fontSize = '22px';
                document.body.appendChild(p);
            }, i * 30);
        }

        // Otomatis Bergeser ke Slide 5 (Slide Terakhir)
        setTimeout(() => {
            currentSlide = 5;
            updateSlides();
        }, 400);
    }

    btnYes.addEventListener("click", acceptApology);
});