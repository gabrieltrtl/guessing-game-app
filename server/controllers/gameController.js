let numeroSecreto = Math.floor(Math.random() * 100) + 1;

const restartGame = (req, res) => {
  console.log('Requisição para reiniciar recebida!');

  numeroSecreto = Math.floor(Math.random() * 100) + 1;
  res.send('O jogo foi reiniciado! Tente adivinhar o novo número')
};

const makeGuess = (req, res) => {
  const { palpite } = req.body;

  if (palpite < 1 || palpite > 100) {
    return res.status(400).send('O palpite deve estar entre 1 e 100');
  }

  if (palpite < numeroSecreto) {
    return res.send('Baixo! Tente novamente.');
  } else if (palpite > numeroSecreto) {
    return res.send('Alto! Tente novamente.');
  } else {
    return res.send('Parabéns, você adivinhou o número!');
  }
};

module.exports = { restartGame, makeGuess };
