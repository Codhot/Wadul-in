const express = require('express')
const router = express.Router()
const laporan = require('../controller/laporanController')
const authenticateJWT = require('../middleware/auth')

router.post('/laporan', authenticateJWT, laporan.create);
router.get('/laporan', authenticateJWT, laporan.getAll);
router.get('/laporan/:id', authenticateJWT, laporan.get);
router.put('/laporan/:id', authenticateJWT, laporan.update);
router.delete('/laporan/:id', authenticateJWT, laporan.delete);

module.exports = router;
