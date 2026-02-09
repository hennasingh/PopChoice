const movieData = sessionStorage.getItem("popchoice_movie");

if (!movieData) {
  console.warn("No movie data found in sessionStorage.");
} else {
  const movie = JSON.parse(movieData);
  const title = document.getElementById("movie_title");
  const details = document.getElementById("movie_details");

  if (title && details && movie) {
    title.textContent = `${movie.title} (${movie.release_year})`;
    details.textContent = movie.content;
  }
}
