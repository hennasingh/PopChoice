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

    const movieResponse = await fetchMovies(combinedText);
    if (!movieResponse) return;

    sessionStorage.setItem("popchoice_movie", JSON.stringify(movieResponse));
    window.location.href = "movie.html";
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

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || "Request failed");
        }

        const data = await response.json();
        console.log(data);
        return data;
    }
    catch (error) {
        console.error(error.message);
    }
}
