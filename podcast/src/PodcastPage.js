import React from 'react';
import { Client } from 'podcast-api';

const MyComponent = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [searchResults, setSearchResults] = React.useState([]);
  const [selectedPodcast, setSelectedPodcast] = React.useState(null);

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    // Fetch search results from the podcast API
    const client = Client({ apiKey: '7947917a2172430eb271ffb603f58985' }); // Replace with your actual API key
    client.search({
      q: searchQuery,
      page_size: 10,
    })
      .then((response) => {
        // Set the search results in the state
        setSearchResults(response.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handlePlayPodcast = (podcast) => {
    // Set the selected podcast in the state
    setSelectedPodcast(podcast);
  };

  return (
    <div>
      <h1>Podcast Search</h1>
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {searchResults.length > 0 ? (
        <ul>
          {searchResults.map((podcast) => (
            <li key={podcast.id}>
              <h3>{podcast.title_original}</h3>
              <p>Author: {podcast.publisher_original}</p>
              <p>Date: {podcast.pub_date_ms}</p>
              <button onClick={() => handlePlayPodcast(podcast)}>Play</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No search results yet.</p>
      )}
      {selectedPodcast && (
        <div>
          <h2>Selected Podcast</h2>
          <h3>{selectedPodcast.title_original}</h3>
          <p>Author: {selectedPodcast.publisher_original}</p>
          <p>Date: {selectedPodcast.pub_date_ms}</p>
          <audio controls>
            <source src={selectedPodcast.audio} type="audio/mp3" />
            Your browser does not support the audio element.
          </audio>
        </div>
      )}
    </div>
  );
};

export default MyComponent;
