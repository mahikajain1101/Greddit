const express = require('express')
const router = express.Router()
const {login} = require('../controllers/goalController')

router.post('/', login);

module.exports = router;


