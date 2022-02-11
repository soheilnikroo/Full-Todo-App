//third party packages and libraries
import {Router} from 'express';


//set router
const router = Router();

//importing controllers
import userControllers from '../controllers/user';

//routing section

//create new user
router.post('/api/users', userControllers.postUser);

//get user base on id search
router.get('/api/users/:userId', userControllers.getUser);

//edit user properties
router.patch('/api/users/:userId', userControllers.patchUser);



//exporting section
export default router
