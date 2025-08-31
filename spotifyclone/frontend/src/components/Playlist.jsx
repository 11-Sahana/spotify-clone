import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Playlist = () => {
  const [songs, setSongs] = useState([]);
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/songs')
      .then(res => setSongs(res.data))
      .catch(err => console.error('Fetch error:', err));
  }, []);

  const addSong = () => {
    if (!title || !artist) return alert('Both fields required');
    axios.post('http://localhost:5000/api/songs', { title, artist })
      .then(res => {
        setSongs([...songs, res.data]);
        setTitle('');
        setArtist('');
      })
      .catch(err => console.error('Add error:', err));
  };

  const deleteSong = (id) => {
    axios.delete(`http://localhost:5000/api/songs/${id}`)
      .then(() => {
        setSongs(songs.filter(song => song._id !== id));
      })
      .catch(err => console.error('Delete error:', err));
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundImage: `url('spotify-bg.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        padding: '50px',
        fontFamily: 'Helvetica, sans-serif',
        color: 'white',
      }}
    >
      {/* Dark overlay */}
      <div
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
          padding: '40px',
          borderRadius: '16px',
          maxWidth: '900px',
          margin: '0 auto',
          backdropFilter: 'blur(10px)',
        }}
      >
        <h1 style={{ color: '#1DB954', fontSize: '36px', marginBottom: '20px' }}>
          🎵 My Spotify Playlist
        </h1>

        <div style={{ display: 'flex', marginBottom: '30px', gap: '10px' }}>
          <input
            placeholder="Song Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            style={{
              flex: 1,
              padding: '12px',
              borderRadius: '6px',
              border: 'none',
              outline: 'none',
              fontSize: '16px',
            }}
          />
          <input
            placeholder="Artist"
            value={artist}
            onChange={e => setArtist(e.target.value)}
            style={{
              flex: 1,
              padding: '12px',
              borderRadius: '6px',
              border: 'none',
              outline: 'none',
              fontSize: '16px',
            }}
          />
          <button
            onClick={addSong}
            style={{
              backgroundColor: '#1DB954',
              color: 'white',
              border: 'none',
              padding: '12px 20px',
              borderRadius: '6px',
              fontWeight: 'bold',
              fontSize: '16px',
              cursor: 'pointer',
            }}
          >
            Add Song
          </button>
        </div>

        {songs.length === 0 ? (
          <p style={{ fontStyle: 'italic', color: '#ccc' }}>No songs in your playlist yet.</p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {songs.map(song => (
              <li
                key={song._id}
                style={{
                  padding: '12px',
                  marginBottom: '10px',
                  borderBottom: '1px solid #333',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span>
                  <strong>{song.title}</strong> by {song.artist}
                </span>
                <button
                  onClick={() => deleteSong(song._id)}
                  style={{
                    backgroundColor: '#e53935',
                    color: 'white',
                    border: 'none',
                    padding: '6px 12px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Playlist;

