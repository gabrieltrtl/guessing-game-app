import React, { useState } from 'react';
import styles from './GuessingGame.module.css';

const GuessingGame = () => {
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState('');
  const [attempts, setAttempts] = useState(0);
  
  const handleGuessChange = (e) => {
    setGuess(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(''); // Limpa a mensagem anterior
    setAttempts((prev) => prev + 1);

    try {
      const response = await fetch('http://localhost:3000/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          palpite: Number(guess),
        }),
      });

      if (!response.ok) {
        throw new Error('Erro ao enviar palpite')
      }

      const data = await response.text();
      setMessage(data);

      setGuess('');

    } catch (error) {
      setMessage(error.message);
    }
  }

  const resetGame = async () => {
  try {
    const response = await fetch('http://localhost:3000/reiniciar', {
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
    setAttempts(0);
    setGuess('');

  } catch (error) {
    setMessage(error.message);
  }
};

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
      <p className={styles.attempts}>Tentativas: {attempts}</p>
    </div>
  )
}

export default GuessingGame;