//third party packages and libraries
import {Router} from 'express';

//set up router
const router = Router();

//importing section 
import taskControllers from '../controllers/task';

//routing section
router.post('/api/users/:userId/tasks', taskControllers.postTask);

//exporting section
export default router;