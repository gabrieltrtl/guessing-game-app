import React, { useState, useEffect } from 'react';
import styles from './GuessingGame.module.css';

const GuessingGame = () => {
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState('');
  const [attempts, setAttempts] = useState(20);
  const [historico, setHistorico] = useState([]);
  
  const handleGuessChange = (e) => {
    setGuess(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(''); // Limpa a mensagem anterior

    try {
      const response = await fetch('http://localhost:3000/game', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          palpite: Number(guess),
        }),
      });

      
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erro ao enviar palpite');
      }

      setMessage(data.message);
      setAttempts(data.tentativas)
      setGuess('');
      setHistorico(data.historico)
      
    } catch (error) {
      setMessage(error.message);
    }
  }

  const resetGame = async () => {
  try {
    const response = await fetch('http://localhost:3000/game/reiniciar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('Response status:', response.status); // Log do status da resposta

    if (!response.ok) {
      throw new Error('Erro ao reiniciar jogo.');
    }

    const data = await response.text();
    setMessage(data);
    setAttempts(20);
    setGuess('');
    setHistorico([]);

  } catch (error) {
    setMessage(error.message);
  }
  };

  useEffect(() => {
    const fetchHistorico = async () => {
      try {
        const response = await fetch('http://localhost:3000/game/historico');
        const data = await response.json();
        setHistorico(data);
      } catch (error) {
        console.log("Erro ao buscar histórico", error);
      }
    }

    fetchHistorico();
  }, [])

  return (
    <div className={styles.guessingGame}>
      <h1 className={styles.title}>Guessing Game App</h1>
      <h2 className={styles.subtitle}>Insira um número entre 1 e 100</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input className={styles.numberInput} type="number"
          value={guess}
          onChange={handleGuessChange}
          required
          min="1"
          max="100"
          />
          <button className={styles.btn} type='submit'>Enviar</button>
          {message && <p className={styles.message}>{message}</p>}
      </form>
      <button className={styles.restartBtn} onClick={resetGame}>Reiniciar Jogo</button>
      <p className={styles.attempts}>Restam {attempts} Tentativas</p>

      <h3>Histórico de Tentativas</h3>
      <ul>
        {historico.map((item, index) => (
          <li key={index}>
            Valor do Palpite: {item.palpite} - {item.resultado}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default GuessingGame;