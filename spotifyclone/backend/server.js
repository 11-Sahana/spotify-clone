const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb+srv://ssahana1110:ssahana%401110@cluster0.8veriyo.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Mongoose Schema
const songSchema = new mongoose.Schema({
  title: String,
  artist: String
});

const Song = mongoose.model('Song', songSchema);

// Routes

// GET all songs
app.get('/api/songs', async (req, res) => {
  try {
    const songs = await Song.find();
    res.json(songs);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch songs' });
  }
});

// Add a new song
app.post('/api/songs', async (req, res) => {
  const { title, artist } = req.body;

  if (!title || !artist) {
    return res.status(400).json({ message: 'Title and artist are required' });
  }

  const newSong = new Song({ title, artist });
  await newSong.save();
  res.status(201).json(newSong);
});



// POST a new song
app.post('/api/songs', async (req, res) => {
  const { title, artist } = req.body;
  if (!title || !artist) {
    return res.status(400).json({ error: 'Title and artist are required' });
  }
  try {
    const newSong = new Song({ title, artist });
    await newSong.save();
    res.json(newSong);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add song' });
  }
});

// DELETE a song by ID
app.delete('/api/songs/:id', async (req, res) => {
  try {
    await Song.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete song' });
  }
});


// Update a song (optional feature)
app.put('/api/songs/:id', async (req, res) => {
  const { id } = req.params;
  const { title, artist } = req.body;

  try {
    const updated = await Song.findByIdAndUpdate(id, { title, artist }, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Update failed', error: err });
  }
});


// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
