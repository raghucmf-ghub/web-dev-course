
const movieForm = document.querySelector("#movie-form");
const movieInput = document.querySelector("#movie-input");
const movieMessage = document.querySelector("#movie-message");
const movieResults = document.querySelector("#movie-results");


const escapeHTML = (text) => {
  return String(text ?? "").replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[character]);
};


const searchMovies = async (movieName) => {
  movieMessage.textContent = "Searching...";
  movieResults.innerHTML = "";

  try {
    const url = `https://imdb.iamidiotareyoutoo.com/search?q=${encodeURIComponent(movieName)}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Unable to connect to the movie API.");
    }

    const data = await response.json();

    const movies = data.results || [];

    if (data.ok === false || movies.length === 0) {
      throw new Error("No movies found. Try another movie name.");
    }

   
    movieResults.innerHTML = movies.map((movie) => {

      const title = movie["#TITLE"] || movie.title || "Unknown Title";

      const year = movie["#YEAR"] || movie.year || "Not available";

      const poster =
        movie["#IMG_POSTER"] ||
        movie.image ||
        movie.poster ||
        "";

      const rating =
        movie["#RATING"] ||
        movie.rating ||
        "Not available";

      const imdbId = movie["#IMDB_ID"] || "";

      return `
        <article class="movie-card">

          ${poster
            ? `<img src="${escapeHTML(poster)}"
                alt="${escapeHTML(title)} poster"
                onerror="this.style.display='none'">`
            : "<p>No poster available</p>"
          }

          <h3>${escapeHTML(title)}</h3>

          <p>
            <strong>Release:</strong>
            ${escapeHTML(year)}
          </p>

          <p>
            <strong>Rating:</strong>
            ${escapeHTML(rating)}
          </p>

          ${imdbId
            ? `<p>
                <a href="https://www.imdb.com/title/${escapeHTML(imdbId)}/"
                   target="_blank"
                   rel="noopener">
                   View on IMDb
                </a>
              </p>`
            : ""
          }

        </article>
      `;
    }).join("");

    movieMessage.textContent = "";

  } catch (error) {
    movieMessage.textContent =
      error.message || "Something went wrong. Please try again.";
  }
};


movieForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const movieName = movieInput.value.trim();

  if (!movieName) {
    movieMessage.textContent = "Please enter a movie name.";
    return;
  }

  searchMovies(movieName);
});