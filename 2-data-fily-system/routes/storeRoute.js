//External Modules
import express from 'express';

//Locally Modules
import { getIndex , getAddHome, postAddHome, editAddHome, posteditAddHome, deleteHome, getHomeDetails} from '../controllers/storeController.js';

const router = express.Router();


router.get('/', getIndex)

router.get('/add-home', getAddHome)
router.post('/add-home', postAddHome)



router.get('/add-home/:homeID', editAddHome)


router.post('/edit-home', posteditAddHome)

router.post('/delete-home/:homeID', deleteHome);

router.get('/home-details/:homeID', getHomeDetails);



export default router;