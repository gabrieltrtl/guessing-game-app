let numeroSecreto = Math.floor(Math.random() * 100) + 1;
let tentativas = 20;
let historico = [];

const checkTentativas = () => {
  return tentativas > 0 ;
}

const restartGame = (req, res) => {
  console.log('Requisição para reiniciar recebida!');

  numeroSecreto = Math.floor(Math.random() * 100) + 1;
  tentativas = 20;
  historico = [];
  res.send('O jogo foi reiniciado! Tente adivinhar o novo número')
};

const makeGuess = (req, res) => {
  const { palpite } = req.body;

  if (palpite < 1 || palpite > 100) {
    return res.status(400).send('O palpite deve estar entre 1 e 100');
  }

  if(!checkTentativas()) {
    return res.status(400).send({ message: 'Você já usou todas as tentativas, reinicie o jogo!', tentativas });
  }

  tentativas--;

  if (palpite < numeroSecreto) {
    historico.push({ palpite, resultado: 'Baixo! Tente novamente.', tentativas });
    return res.send({ message: 'Baixo! Tente novamente.', tentativas, historico });
  } else if (palpite > numeroSecreto) {
    historico.push({ palpite, resultado: 'Alto! Tente novamente.', tentativas });
    return res.send({ message: 'Alto! Tente novamente.', tentativas, historico });
  } else {
    historico.push({ palpite, resultado: 'Parabéns, você adivinhou o número!', tentativas });
    return res.send({ message: 'Parabéns, você adivinhou o número!', tentativas, historico });
  }
};

const getHistorico = (req, res) => {
  res.send(historico);
}

module.exports = { restartGame, makeGuess, getHistorico };
