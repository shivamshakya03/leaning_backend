//External Modules
import express from 'express';

//Locally Modules
import { getIndex , getAddHome, postAddHome} from '../controllers/storeController.js';

const router = express.Router();


router.get('/', getIndex)

router.get('/add-home', getAddHome)
router.post('/add-home', postAddHome)



export default router;