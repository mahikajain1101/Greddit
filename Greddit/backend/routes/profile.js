const express = require('express')
const router = express.Router()
const {profile, editprofile} = require('../controllers/goalController')
const {authorise} = require('../middleware/authorise')


router.use(authorise)
router.get('/',authorise,profile);
router.post('/edit',authorise,editprofile);

module.exports = router;