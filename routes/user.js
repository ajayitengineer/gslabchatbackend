const express = require('express');
const router = express.Router();
const controller = require('../controllers/user');

router.get('/:id',controller.allUser);

module.exports = router;