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

let currentPage = 1;
    const limit = 6; // Number of results per page
    let searchTerm = '';

// Function to fetch and display dad jokes
function fetchJokes(page) {
    const jokeContainer = document.getElementById('joke-container');

    // Make a GET request to the Dad Joke API
    const apiUrl = `https://icanhazdadjoke.com/search?page=${page}&limit=${limit}&term=${searchTerm}`;
    fetch(apiUrl, {
        headers: {
            'Accept': 'application/json',
        }
    })
        .then(response => response.json())
        .then(data => {
            // Clear the previous jokes
            jokeContainer.innerHTML = '';

            if (data.results && data.results.length > 0) {
                data.results.forEach(joke => {
                    const jokeCard = document.createElement('div');
                    jokeCard.classList.add('joke-card');
                    jokeCard.innerHTML = `<p>${joke.joke}</p>`;
                    jokeContainer.appendChild(jokeCard);
                });
            } else {
                jokeContainer.innerHTML = '<p>No jokes found.</p>';
            }

                document.getElementById('page').textContent = currentPage;
            })
            .catch(error => {
                console.error('Error fetching jokes:', error);
            });
    }

// Function to handle next page
function nextPage() {
    currentPage++;
    fetchJokes(currentPage);
}

// Function to handle previous page
function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        fetchJokes(currentPage);
    }
}

// Function to handle search
function searchJokes() {
    searchTerm = document.getElementById('searchTerm').value.trim();
    currentPage = 1; // Reset to the first page when searching
    fetchJokes(currentPage);
}

// Load initial jokes
fetchJokes(currentPage);

 // JavaScript to trigger the modal when the link is clicked
$(document).ready(function() {
$('a[data-toggle="modal"]').click(function() {
    var target = $(this).data('target');
    $(target).modal('show');
    });
});





