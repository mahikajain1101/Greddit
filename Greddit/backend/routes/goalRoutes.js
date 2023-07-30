const express = require('express')
const router = express.Router()
const {getGoals,register} = require('../controllers/goalController')

router.get('/', getGoals)

router.post('/', register)

module.exports = router 