import React from 'react';
import { Client } from 'podcast-api';
import "./PodcastPage.css"

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
      page_size: 20,
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
<div  style={{ backgroundColor:'#ffffff', textAlign: 'center' }} >
      <h1>Podcast Search</h1>
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
        />
        <br></br>
        <br></br>
        <button type="submit">Search</button>
      </form>
      </div>
      <div  style={{ backgroundColor:'rgb(27, 127, 103)', boxShadow: '0px 0px 5px rgba(0, 0, 255, 0.2)'}}  >
      {searchResults.length > 0 ? (
        <ul style={{ display: 'flex', flexWrap: 'wrap' }}>
          {searchResults.map((podcast) => (
            <li key={podcast.id}  style={{ flex: '0 0 25%', margin: 'auto', textAlign: 'center' }}>
              {podcast.thumbnail && <img src={podcast.thumbnail} alt={podcast.title_original} />}
              <div className='desc'>
              <h3> <a href =  {podcast.listennotes_url} >{podcast.title_original}</a></h3>
              <p>Author: {podcast.publisher_original ? podcast.publisher_original : 'Unknown'}</p>
              <button onClick={() => handlePlayPodcast(podcast)}>Play</button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No search results yet.</p>
      )}
      {selectedPodcast && (
        <div style={{margin :'auto', textAlign:'center', color : '#ffffff'}}>
          <h2>Selected Podcast</h2>
          <h3>{selectedPodcast.title_original}</h3>
          <audio controls>
            <source src={selectedPodcast.audio} type="audio/mp3" />
            Your browser does not support the audio element.
          </audio>
        </div>
      )}
      </div>
      </div>
    
  );
};

export default MyComponent;
