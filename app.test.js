import { fetchDadJoke } from './api';
import { fetchJoke } from './app';

jest.mock('./api');

describe('fetchJoke', () => {
  it('fetches a joke and updates the HTML', async () => {
    const mockJoke = 'Mocked Joke';
    fetchDadJoke.mockResolvedValue({ joke: mockJoke });

    const jokeContainer = document.createElement('div');
    jokeContainer.id = 'joke-login';
    document.body.appendChild(jokeContainer);

    await fetchJoke();

    expect(jokeContainer.innerHTML).toContain(`"${mockJoke}"`);
  });

  it('handles a failed fetch', async () => {
    fetchDadJoke.mockRejectedValue(new Error('Failed to fetch joke'));

    const jokeContainer = document.createElement('div');
    jokeContainer.id = 'joke-login';
    document.body.appendChild(jokeContainer);

    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    await fetchJoke();

    expect(consoleErrorSpy).toHaveBeenCalledWith('Error fetching joke:', expect.any(Error));
  });
});
