const express = require('express');
const cors = require('cors');
require('dotenv').config();
const strangerThingsDataset = require('./data/dataset/stranger-things-characters.json');
const StrangerThingsRepository = require('./data/repository/StrangerThings');
const StrangerThingsService = require('./services/StrangerThings');

const app = express();

const strangerThingsRepository = new StrangerThingsRepository(
  strangerThingsDataset,
);
const strangerThingsService = new StrangerThingsService(
  strangerThingsRepository,
);

app.use(cors());

const UPSIDEDOWN_MODE = process.env.UPSIDEDOWN_MODE.toLowerCase() === 'true' || false;

const { PORT } = process.env;

app.get('/', (req, res) => {
  const characters = strangerThingsService.search(
    req.query,
    UPSIDEDOWN_MODE,
  );

  res.status(200).json(characters);
});

app.listen(PORT, () => {
  console.log(`Escutando na porta ${PORT}`);
});

// Agradecimentos a Raphael Gumieri Turma 10 Tribo - B pelo auxilio no Requisito 6 