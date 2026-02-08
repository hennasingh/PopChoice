const form = document.querySelector("form");

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const pairs = getFormPairs(form);
    if (!pairs.length) {
        console.warn("No input provided.");
        return;
    }

    const combinedText = pairs.join("\n");
    console.log(combinedText);

    await fetchMovies(combinedText);
});

function getFormPairs(formEl) {
    const inputs = [...formEl.querySelectorAll("input")];
    return inputs
        .map((input) => {
            const value = input.value.trim();
            if (!value) return "";

            const label = formEl.querySelector(`label[for="${input.id}"]`);
            const question = label ? label.textContent.trim() : input.name || "Question";
            return `${question} ${value}`;
        })
        .filter((pair) => pair.length > 0);
}

async function fetchMovies(input) {
    try {
        const url = "https://openai-popchoice-worker.hennasingh04.workers.dev"

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(input)
        })

        const data = await response.json();
        console.log(data);
    }
    catch (error) {
        console.error(error.message);
    }
}