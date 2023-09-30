function fetchJoke() {
const jokeContainer = document.getElementById('joke-login');

fetch('https://icanhazdadjoke.com/', {
    headers: {
        'Accept': 'application/json',
    }
})
    .then(response => response.json())
    .then(data => {
        // Log the JSON response to the console
        console.log(data);
          // Update the HTML with the fetched joke
        jokeContainer.innerHTML = `<p>"${data.joke}"</p>`;
    })
    .catch(error => {
        console.error('Error fetching joke:', error);
    });
}



// Function to fetch and display dad jokes
let currentPage = 1; // Initialize currentPage to 1

// Function to fetch and display dad jokes
function fetchJokes() {
    const jokeContainer = document.getElementById('joke-container');
    const searchInput = document.getElementById('search-input').value.trim();
    const limit = 6; // Number of jokes per page

    let apiUrl = `https://icanhazdadjoke.com/search?page=${currentPage}&limit=${limit}`;

    if (searchInput !== "") {
        apiUrl += `&term=${encodeURIComponent(searchInput)}`;
    }

    // Make a GET request to the Dad Joke API
    fetch(apiUrl, {
        headers: {
            'Accept': 'application/json',
        }
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            // Clear the previous jokes
            jokeContainer.innerHTML = '';

            if (data.results.length === 0) {
                jokeContainer.innerHTML = '<p>No jokes found.</p>';
                return;
            }

            // Display each joke in a card
            data.results.forEach(joke => {
                const jokeCard = document.createElement('div');
                jokeCard.classList.add('joke-card');
                jokeCard.innerHTML = `<p>"${joke.joke}"</p>`;
                jokeContainer.appendChild(jokeCard);
            });
        })
        .catch(error => {
            console.error('Error fetching jokes:', error);
        });
}

// Function to search for jokes
function searchJokes() {
    currentPage = 1; // Reset to the first page when searching
    fetchJokes();
}
// Function to increment the page
function nextPage() {
    currentPage++;
    fetchJokes();
    updateCurrentPage();
}

// Function to decrement the page
function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        fetchJokes();
        updateCurrentPage();
    }
}

// Function to update the current page display
function updateCurrentPage() {
    const currentPageSpan = document.getElementById('current-page');
    currentPageSpan.textContent = currentPage;
}

// Initial fetch when the page loads
fetchJokes();

 // JavaScript to trigger the modal when the link is clicked
 $(document).ready(function() {
    $('a[data-toggle="modal"]').click(function() {
      var target = $(this).data('target');
      $(target).modal('show');
    });
  });





