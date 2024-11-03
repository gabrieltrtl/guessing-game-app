const express = require('express');
const router = express.Router();
const { restartGame, makeGuess, getHistorico } = require('../controllers/gameController')

router.post('/reiniciar', restartGame);
router.post('/', makeGuess)
router.get('/historico', getHistorico)

module.exports = router;