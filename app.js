import { fetchDadJoke } from './api';

async function fetchJoke() {
  const jokeContainer = document.getElementById('joke-login');

  try {
    const joke = await fetchDadJoke();
    // Update the HTML with the fetched joke
    jokeContainer.innerHTML = `<p>"${joke}"</p>`;
  } catch (error) {
    console.error('Error fetching joke:', error);
  }
}
