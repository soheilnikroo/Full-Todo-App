//third party packages and libraries
import {Router} from 'express';


//set router
const router = Router();

//importing controllers
import userControllers from '../controllers/user';

//routing section
router.post('/api/users',userControllers.postUser);



//exporting section
export default router
