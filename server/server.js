const express = require('express');
const cors = require('cors');
const gameRoutes = require('./routes/gameRoutes');

const app = express();
const { PORT = '3000' } = process.env;

app.use(cors());
app.use(express.json());
app.use('/game', gameRoutes);

app.listen(PORT, () => {
  console.log(`Server is Listening Port ${PORT}`)
})