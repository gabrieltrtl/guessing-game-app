const express = require('express');
const router = express.Router();
const { restartGame, makeGuess } = require('../controllers/gameController')

router.post('/reiniciar', restartGame);
router.post('/', makeGuess)

module.exports = router;