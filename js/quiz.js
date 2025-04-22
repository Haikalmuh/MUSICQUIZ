// Ambil elemen-elemen penting
const questionCountText = document.querySelector(".question-count");
const questionInstruction = document.querySelector(".question-instruction");
const questionText = document.querySelector(".question-text");
const optionsContainer = document.querySelector(".options");
const submitBtn = document.querySelector(".submit-btn");
const feedback = document.querySelector(".feedback");
const nextBtn = document.querySelector(".next-btn");

let currentQuestionIndex = 0;
let selectedOptionIndex = null;
let userTypedAnswer = "";
let score = 0;
let correctCount = 0;

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function showQuestion() {
    const currentQuestion = questions[currentQuestionIndex];

    // Update teks soal dan instruksi
    questionCountText.textContent = `Quiz ${currentQuestionIndex + 1} / ${questions.length}`;
    questionInstruction.textContent = currentQuestion.instruction;
    optionsContainer.innerHTML = "";
    feedback.classList.add("hidden");
    nextBtn.classList.add("hidden");
    submitBtn.disabled = true;
    selectedOptionIndex = null;
    userTypedAnswer = "";

    if (currentQuestionIndex === questions.length - 1) {
        nextBtn.textContent = "Selesai";
    } else {
        nextBtn.textContent = "Selanjutnya";
    }

    // Tampilkan soal teks atau audio atau image
    if (currentQuestion.type === "text") {
        questionText.textContent = `"${currentQuestion.content}"`;
    } else if (currentQuestion.type === "audio") {
        questionText.innerHTML = `
            <audio controls>
                <source src="${currentQuestion.content}" type="audio/mpeg">
                Browser kamu tidak mendukung audio.
            </audio>
        `;
    }

    // ==== AWAL: Soal Tebak Penyanyi (Tipe Gambar dengan Input Jawaban) ====
    else if (currentQuestion.type === "image") {
        questionText.innerHTML = `<img src="${currentQuestion.content}" alt="Penyanyi" class="singer-image">`;

        // Cek apakah punya opsi (berarti soal pilihan ganda)
        if (currentQuestion.options) {
            currentQuestion.options.forEach((option, index) => {
                const btn = document.createElement("button");
                btn.classList.add("option-btn", `option-${String.fromCharCode(97 + index)}`);
                btn.textContent = option;
                btn.addEventListener("click", () => {
                    const allOptionButtons = document.querySelectorAll(".option-btn");
                    allOptionButtons.forEach((btn) => btn.classList.remove("selected"));
                    btn.classList.add("selected");
                    selectedOptionIndex = index;
                    submitBtn.disabled = false;
                });
                optionsContainer.appendChild(btn);
            });
        } else {
            // Kalau gak punya opsi, pakai input teks
            const input = document.createElement("input");
            input.type = "text";
            input.placeholder = "Ketik nama penyanyi...";
            input.classList.add("text-input");
            input.addEventListener("input", () => {
                userTypedAnswer = input.value.trim();
                submitBtn.disabled = userTypedAnswer === "";
            });
            optionsContainer.appendChild(input);
        }

        return;
    }

    // ==== AKHIR: Soal Tebak Penyanyi (Tipe Gambar dengan Input Jawaban) ====

    else if (currentQuestion.type === "arrange") {
        questionText.textContent = ""; // Kosongkan karena instruksi sudah cukup
        const choices = [...currentQuestion.content];
        const shuffled = choices.sort(() => Math.random() - 0.5);

        const bank = document.createElement("div");
        bank.className = "lyric-bank";

        const dropZone = document.createElement("div");
        dropZone.className = "lyric-dropzone";

        shuffled.forEach(word => {
            const btn = document.createElement("button");
            btn.className = "lyric-block";
            btn.textContent = word;
            btn.addEventListener("click", () => {
                if (!btn.disabled) {
                    const clone = btn.cloneNode(true);
                    clone.addEventListener("click", () => {
                        clone.remove();
                        btn.disabled = false;
                        btn.style.display = "";
                        // Periksa ulang apakah dropzone kosong
                        const zone = optionsContainer.querySelector(".lyric-dropzone");
                        const isEmpty = zone.querySelectorAll(".lyric-block").length === 0;
                        submitBtn.disabled = isEmpty;
                    });
                    clone.classList.add("animate-in");
                    dropZone.appendChild(clone);
                    btn.disabled = true;
                    btn.style.display = "none";
                    submitBtn.disabled = false;
                }
            });
            bank.appendChild(btn);
        });

        optionsContainer.appendChild(dropZone);
        optionsContainer.appendChild(bank);
        return;
    }

    else if (currentQuestion.type === "truefalse") {
        questionText.textContent = currentQuestion.content;

        ["Benar", "Salah"].forEach((label, index) => {
            const btn = document.createElement("button");
            btn.classList.add("option-btn", `option-${index === 0 ? "a" : "b"}`);
            btn.textContent = label;
            btn.addEventListener("click", () => {
                const allOptionButtons = document.querySelectorAll(".option-btn");
                allOptionButtons.forEach((btn) => btn.classList.remove("selected"));
                btn.classList.add("selected");
                selectedOptionIndex = index;
                submitBtn.disabled = false;
            });
            optionsContainer.appendChild(btn);
        });

        return;
    }


    // Tampilkan pilihan jika bukan soal gambar
    currentQuestion.options.forEach((option, index) => {
        const btn = document.createElement("button");
        btn.classList.add("option-btn", `option-${String.fromCharCode(97 + index)}`);
        btn.textContent = option;
        btn.addEventListener("click", () => {
            const allOptionButtons = document.querySelectorAll(".option-btn");
            allOptionButtons.forEach((btn) => btn.classList.remove("selected"));
            btn.classList.add("selected");
            selectedOptionIndex = index;
            submitBtn.disabled = false;
        });
        optionsContainer.appendChild(btn);
    });
}

submitBtn.addEventListener("click", () => {
    const currentQuestion = questions[currentQuestionIndex];

    // ==== AWAL: Cek Jawaban untuk Soal Arrange (Susun Lirik) ====
    if (currentQuestion.type === "arrange") {
        const userBlocks = optionsContainer.querySelectorAll(".lyric-dropzone .lyric-block");
        const userAnswer = Array.from(userBlocks).map(b => b.textContent);
        const correctAnswer = currentQuestion.answer;

        const isCorrect = JSON.stringify(userAnswer) === JSON.stringify(correctAnswer);

        if (isCorrect) {
            score += 5;
            correctCount++;
        }

        document.getElementById("score").textContent = `Poin: ${score}`;

        feedback.textContent = isCorrect
            ? "Benar!"
            : `Salah! Urutan yang benar: ${correctAnswer.join(" ")}`;
        feedback.classList.toggle("green", isCorrect);
        feedback.classList.toggle("red", !isCorrect);
        feedback.classList.remove("hidden");
        nextBtn.classList.remove("hidden");
        submitBtn.disabled = true;
        return;
    }
    // ==== AKHIR: Cek Jawaban untuk Soal Arrange (Susun Lirik) ====

    // ==== AWAL: Cek Jawaban untuk Soal Gambar dengan Input ====
    if (currentQuestion.type === "image") {
        if (currentQuestion.options) {
            // Soal gambar dengan pilihan ganda (opsi)
            const optionButtons = document.querySelectorAll(".option-btn");

            optionButtons.forEach((btn, idx) => {
                btn.disabled = true;
                btn.classList.remove("selected");

                if (idx === currentQuestion.answer) {
                    btn.classList.add("correct");
                }

                if (idx === selectedOptionIndex && selectedOptionIndex !== currentQuestion.answer) {
                    btn.classList.add("wrong");
                }
            });

            if (selectedOptionIndex === currentQuestion.answer) {
                score += 5;
                correctCount++;
                document.getElementById("score").textContent = `Poin: ${score}`;
                feedback.textContent = "Benar!";
                feedback.classList.remove("red");
                feedback.classList.add("green");
            } else {
                feedback.textContent = `Salah! Jawaban yang benar adalah: ${currentQuestion.options[currentQuestion.answer]}`;
                feedback.classList.remove("green");
                feedback.classList.add("red");
            }

            feedback.classList.remove("hidden");
            nextBtn.classList.remove("hidden");
            submitBtn.disabled = true;
            return;

        } else {
            // Soal gambar dengan input teks
            const correctAnswers = currentQuestion.answers.map(ans => ans.trim().toLowerCase());
            const userAnswer = userTypedAnswer.trim().toLowerCase();
            const isCorrect = correctAnswers.includes(userAnswer);

            if (isCorrect) {
                score += 5;
                correctCount++;
            }

            document.getElementById("score").textContent = `Poin: ${score}`;

            feedback.textContent = isCorrect
                ? "Benar!"
                : `Salah! Jawaban yang benar: ${currentQuestion.answers[0]}`;
            feedback.classList.toggle("green", isCorrect);
            feedback.classList.toggle("red", !isCorrect);
            feedback.classList.remove("hidden");
            nextBtn.classList.remove("hidden");
            submitBtn.disabled = true;
            return;
        }
    }
    // ==== AKHIR: Cek Jawaban untuk Soal Gambar dengan Input ====

    // ==== AWAL: Cek Jawaban untuk Soal Benar atau Salah ====
    if (currentQuestion.type === "truefalse") {
        const optionButtons = document.querySelectorAll(".option-btn");

        optionButtons.forEach((btn, idx) => {
            btn.disabled = true;
            btn.classList.remove("selected");

            if (idx === currentQuestion.answer) {
                btn.classList.add("correct");
            }

            if (idx === selectedOptionIndex && selectedOptionIndex !== currentQuestion.answer) {
                btn.classList.add("wrong");
            }
        });

        if (selectedOptionIndex === currentQuestion.answer) {
            score += 5;
            correctCount++;
            document.getElementById("score").textContent = `Poin: ${score}`;
            feedback.textContent = "Benar!";
            feedback.classList.remove("red");
            feedback.classList.add("green");
        } else {
            feedback.innerHTML = `❌ Jawaban yang benar adalah: <strong>${currentQuestion.answer === 0 ? "Benar" : "Salah"}</strong>.<br>✅ Fakta: ${currentQuestion.fact}`;
            feedback.classList.remove("green");
            feedback.classList.add("red");
        }

        feedback.classList.remove("hidden");
        nextBtn.classList.remove("hidden");
        submitBtn.disabled = true;
        return;
    }
    // ==== AKHIR: Cek Jawaban untuk Soal Benar atau Salah ====    

    const optionButtons = document.querySelectorAll(".option-btn");

    optionButtons.forEach((btn, idx) => {
        btn.disabled = true;
        btn.classList.remove("selected");

        if (idx === currentQuestion.answer) {
            btn.classList.add("correct");
        }

        if (idx === selectedOptionIndex && selectedOptionIndex !== currentQuestion.answer) {
            btn.classList.add("wrong");
        }
    });

    if (selectedOptionIndex === currentQuestion.answer) {
        score += 5;
        correctCount++;
        document.getElementById("score").textContent = `Poin: ${score}`;
        feedback.textContent = "Benar!";
        feedback.classList.remove("red");
        feedback.classList.add("green");
    } else {
        feedback.textContent = `Salah! Jawaban yang benar adalah: ${currentQuestion.options[currentQuestion.answer]}`;
        feedback.classList.remove("green");
        feedback.classList.add("red");
    }

    feedback.classList.remove("hidden");
    nextBtn.classList.remove("hidden");
    submitBtn.disabled = true;
});

nextBtn.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        document.querySelector(".quiz-card").innerHTML = `
            <h2>Kuis selesai!</h2>
            <p>Kamu menjawab <strong>${correctCount}</strong> benar dan <strong>${questions.length - correctCount}</strong> salah</p>
            <p>Poin kamu: <strong>${score}</strong> / ${questions.length * 5}</p>
            <p>Terima kasih telah bermain 🎉</p>
            <div class="image-credits">
        <div class="quiz-credits">
  <hr>
  <p><strong>Kredit & Disclaimer:</strong></p>
  <p>
    Semua gambar dan audio digunakan hanya untuk keperluan pribadi dan non-komersial. Hak cipta dimiliki oleh pemilik aslinya.
    Gambar penyanyi dan cover album diperoleh dari Pinterest, Wikipedia, dan sumber terbuka lainnya. Audio berasal dari Spotify atau cuplikan lagu asli sebagai bagian dari media edukatif.
  </p>
</div>
        `;
    }
});

// Tampilkan soal pertama saat halaman dimuat
shuffleArray(questions);
showQuestion();
