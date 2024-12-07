function toggleMobileMenu(){
	document.getElementById("menu").classList.toggle("active");
}

const correctAnswers = {
    q1: "C", // Michael Schumacher
    q2: "B", // Ferrari
    q3: "B", // 1950
    q4: "B", // Max Verstappen
    q5: "B", // Circuit de Monaco
    q6: "C", // 305 km
    q7: ["A", "C", "D"], // Vettel, Schumacher, Alonso
    q8: "La Source", // Spa-Francorchamps
    q9: "15", // Verstappen wins in 2022
    q10: "A" // Red Bull
};

document.getElementById("submit-btn").addEventListener("click", function () {
    const form = document.getElementById("quiz-form");
    let score = 0;
    let totalQuestions = Object.keys(correctAnswers).length;

    let allFilled = true;
    Object.keys(correctAnswers).forEach((question) => {
        if (Array.isArray(correctAnswers[question])) {
            const checkboxes = form.querySelectorAll(`input[name="${question}"]:checked`);
            if (checkboxes.length === 0) {
                allFilled = false;
            }
        } else {
            const userInput = form[question]?.value || null;
            if (!userInput) {
                allFilled = false;
            }
        }
    });

    if (!allFilled) {
        alert("Veuillez répondre à toutes les questions !");
        return;
    }

    const userAnswers = {};
    Object.keys(correctAnswers).forEach((question) => {
        if (Array.isArray(correctAnswers[question])) {
            const checkboxes = form.querySelectorAll(`input[name="${question}"]:checked`);
            userAnswers[question] = Array.from(checkboxes).map((checkbox) => checkbox.value);
        } else {
            userAnswers[question] = form[question]?.value || null;
        }
    });

    Object.keys(correctAnswers).forEach((question) => {
        const questionElement = form.querySelectorAll(`[name="${question}"]`);
        if (Array.isArray(correctAnswers[question])) {
            const correctAnswerSet = new Set(correctAnswers[question]);
            questionElement.forEach((checkbox) => {
                checkbox.parentElement.style.color = correctAnswerSet.has(checkbox.value)
                    ? "green"
                    : "red";
            });
        } else {
            questionElement.forEach((input) => {
                input.parentElement.style.color =
                    input.value === correctAnswers[question] ? "green" : "red";
            });
        }
    });
    const correctList = document.getElementById("correct-answers");
    correctList.innerHTML = "";
    Object.keys(correctAnswers).forEach((question) => {
        if (
            Array.isArray(correctAnswers[question])
                ? JSON.stringify(userAnswers[question]?.sort()) ===
                  JSON.stringify(correctAnswers[question]?.sort())
                : userAnswers[question]?.toString().trim().toLowerCase() ===
                  correctAnswers[question]?.toString().trim().toLowerCase()
        ) {
            score++;
        } else {
            const listItem = document.createElement("li");
            const correctAnswerText = Array.isArray(correctAnswers[question])
                ? correctAnswers[question].join(", ")
                : correctAnswers[question];
            listItem.textContent = `Question ${question.slice(1)} : ${correctAnswerText}`;
            correctList.appendChild(listItem);
        }
    });
    document.getElementById("score").textContent = `Votre score est de ${score} sur ${totalQuestions}`;
    document.getElementById("result").classList.remove("hidden");
});

document.getElementById("reset-btn").addEventListener("click", function () {
    const form = document.getElementById("quiz-form");
    form.reset();
    document.getElementById("result").classList.add("hidden");
    const inputs = form.querySelectorAll("input, select, textarea");
    inputs.forEach((input) => {
        input.parentElement.style.color = "";
    });
});
