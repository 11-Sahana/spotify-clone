import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PlaylistManager = () => {
  const [songs, setSongs] = useState([]);
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');

  useEffect(() => {
    fetchSongs();
  }, []);

  const fetchSongs = async () => {
    const res = await axios.get('http://localhost:4000/api/songs');
    setSongs(res.data);
  };

  const addSong = async () => {
    await axios.post('http://localhost:4000/api/songs', { title, artist });
    setTitle('');
    setArtist('');
    fetchSongs();
  };

  const deleteSong = async (id) => {
    await axios.delete(`http://localhost:4000/api/songs/${id}`);
    fetchSongs();
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Create Playlist</h2>
      <input
        placeholder="Song Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        className="border p-2 mr-2"
      />
      <input
        placeholder="Artist"
        value={artist}
        onChange={e => setArtist(e.target.value)}
        className="border p-2 mr-2"
      />
      <button onClick={addSong} className="bg-green-500 text-white p-2">Add Song</button>
      <ul className="mt-4">
        {songs.map(song => (
          <li key={song._id} className="flex justify-between border-b py-2">
            <span>{song.title} - {song.artist}</span>
            <button onClick={() => deleteSong(song._id)} className="text-red-500">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlaylistManager;
