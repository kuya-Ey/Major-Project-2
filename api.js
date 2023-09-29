export async function fetchDadJoke() {
    const response = await fetch('https://icanhazdadjoke.com/', {
      headers: {
        Accept: 'application/json',
      },
    });
  
    if (!response.ok) {
      throw new Error('Failed to fetch joke');
    }
  
    const data = await response.json();
    return data.joke;
  }
  