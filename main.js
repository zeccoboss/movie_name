const movieInput = document.getElementById('movie-name');
const head = document.getElementById('head');

const addButton = document.getElementById('add-movie');
const errorMessage = document.getElementById('error');
const clearAllButton = document.getElementById('clear-all-movie');
const movieNameSection = document.getElementById('movie-names');
const searchButton = document.getElementById('search-button');
const searchArea = document.getElementById('search-area')
const search = document.getElementById('search');
const searchResult = document.getElementById('search-result');
const container = document.getElementById('container')

// Fetch movies from local storage
let movies = JSON.parse(localStorage.getItem('movies')) || [];

// set to display none 
search.style.display = 'none';
searchButton.addEventListener('click', (e) => {
  search.style.display = search.style.display === 'none' ? 'block' : 'none';
  search.focus();
  searchButton.style.marginBottom = '1rem';

})

function displayMovies() {
  // Clear the list to prevent duplicate entries
  movieNameSection.innerHTML = '';

  movies.forEach((movie, index) => {
    const movieItem = document.createElement('li');
    const movieTitle = document.createElement('span');
    const deleteButton = document.createElement('button');

    movieTitle.innerText = movie;
    deleteButton.innerText = 'Delete';
    deleteButton.classList.add('delete-button');

    // Delete movie when button is clicked
    deleteButton.addEventListener('click', () => {
      if (confirm('Are you sure you want to delete this movie?')) {
        movies.splice(index, 1); // Remove from array
        localStorage.setItem('movies', JSON.stringify(movies)); // Update local storage
        displayMovies(); // Refresh display
      }

    });

    movieItem.appendChild(movieTitle);
    movieItem.appendChild(deleteButton);
    movieNameSection.appendChild(movieItem);
  });

  // Show or hide the list
  movieNameSection.style.display = movies.length > 0 ? 'block' : 'none';
}

// Initial display of movies
displayMovies();

addButton.addEventListener('click', () => {
  addMovie();
});

function addMovie() {
  const movieName = movieInput.value.trim();

  if (!movieName) {
    errorMessage.style.display = 'block';
    errorMessage.innerText = 'Enter movie name!';
    movieInput.style.border = '1px solid hsla(0, 100%, 50%, 1)';

    return;
  } else if (movieName.length > 25) {
    errorMessage.style.display = 'block';
    errorMessage.innerText = 'Movie name must not exceed 25 characters!';
    movieInput.style.border = '1px solid hsla(0, 100%, 50%, 1)';

    return;
  } else if (movies.includes(movieName)) {
    errorMessage.style.display = 'block';
    errorMessage.innerText = 'Movie already exist!';
    movieInput.style.border = '1px solid hsla(0, 100%, 50%, 1)';

    return;
  } else {
    errorMessage.style.display = 'none';
    movieInput.style.border = '1px solid hsla(0, 0%, 0%)';
  }



  // Hide error messages if input is valid
  errorMessage.style.display = 'none';
  movieInput.style.border = '1px solid black';

  // Add new movie and update local storage
  movies.push(movieName);
  localStorage.setItem('movies', JSON.stringify(movies));

  // Clear input and refresh display
  movieInput.value = '';
  displayMovies();
}



function searchMovie() {
  search.addEventListener('input', (e) => {
    const movie = e.target.value.trim().toLowerCase();
    const filteredMovies = movies.filter(item =>
      item.toLowerCase().includes(movie)
    );

    // Clear previous results before displaying new ones
    searchResult.innerHTML = '';

    if (filteredMovies.length === 0 && movie !== '') {
      // Show a message when no results are found
      const noResultMessage = document.createElement('p');
      noResultMessage.innerText = 'No matching results found';
      searchResult.appendChild(noResultMessage);
    } else if (movies.includes(movie)) {
      movieItem.style.background = 'white'
    } else {
      // Display the filtered results
      filteredMovies.forEach((item) => {
        const movieItem = document.createElement('p');
        movieItem.innerText = item;
        searchResult.appendChild(movieItem);
        return movieItem;
      });
    }

    // If the input is empty, clear the results
    if (movie === '') {
      searchResult.innerHTML = '';
    }
  });
}

searchMovie();