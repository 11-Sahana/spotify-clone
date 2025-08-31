const express = require("express");
const router = express.Router();
const Song = require("../models/Song");

router.get("/", async (req, res) => {
  const songs = await Song.find();
  res.json(songs);
});

router.post("/", async (req, res) => {
  const song = new Song(req.body);
  await song.save();
  res.json(song);
});

router.delete("/:id", async (req, res) => {
  await Song.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

module.exports = router;



