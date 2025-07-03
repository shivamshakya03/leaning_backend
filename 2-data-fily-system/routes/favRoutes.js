//External Modules
import express from 'express';

//Locally Modules
import {postfavHomes, getFav, removeFavHomes} from '../controllers/favController.js';

const router = express.Router();



router.get('/favpage', getFav);

router.post('/add-to-fav/:homeID', postfavHomes);


router.post('/remove-fav-home/:homeID', removeFavHomes)




export default router;