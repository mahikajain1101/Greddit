const { application } = require('express');
const express = require('express')
const router = express.Router()
const {mysg, data, deletemysg,showsg,addfollowing,nopost,removefollow,unfollow,deleteuserpost,removesave, deletepost,showsaved,joinsg,downvote,addcomment, addsave,addfollow,showjoined,upvote, showpost, joiningsg, joinreq, sendpost, joinreject, leave, showsub_desc} = require('../controllers/goalController')
const {authorise} = require('../middleware/authorise')


router.use(authorise)

router.post('/mysg',authorise, mysg);
router.post('/post',authorise, sendpost);
router.post('/upvote',authorise, upvote);
router.post('/downvote',authorise, downvote);
router.post('/follow',authorise, addfollow);
router.post('/following',authorise, addfollowing);
router.post('/comment',authorise, addcomment);
router.post('/save',authorise, addsave);
router.post('/remove',authorise, removesave);
router.post('/removefollow',authorise, removefollow);
router.post('/unfollow',authorise, unfollow);


router.post('/:id',authorise, joiningsg);
router.post('/:id/join',authorise,joinsg);
router.post('/:id/reject',authorise,joinreject);
router.post('/:id/leave',authorise,leave);
router.post('/:id/userdelete',authorise, deleteuserpost);

router.get('/data',authorise,data);
router.get('/showsaved',authorise,showsaved);
router.get('/:id/allpost',authorise, showpost);
router.get('/',authorise,showsg);
router.get('/joined',authorise, showjoined);
router.delete('/mysg/:id',authorise, deletemysg);
router.delete('/:id/postdelete',authorise, deletepost);
router.get('/:id/joinreq',authorise,joinreq);
router.get('/:id/main',authorise, showsub_desc);
router.get('/mysg/:id/nopost',authorise, nopost)




module.exports = router;




