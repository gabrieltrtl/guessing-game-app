const express = require('express')
const app = express()
const { PORT = '3000' } = process.env
const cors = require('cors');

app.use(cors());

app.use(express.json())

let numeroSecreto = Math.floor(Math.random() * 100) + 1;

app.post('/', (req, res) => {
  const { palpite } = req.body;

  if (palpite < 1 || palpite > 100) {
    return res.status(400).send('O palpite deve estar entre 1 e 100')
  }

  if (palpite < numeroSecreto) {
      return res.send('Muito baixo! Tente novamente.')
  } else if (palpite > numeroSecreto) {
      return res.send('Muito alto! Tente novamente.')
  } else {
    return res.send('Parabéns, você adivinhou o número!')
  }
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})