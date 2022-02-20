//third party packages and libraries
import {Router} from 'express';

//set up router
const router = Router();

//importing section 
import taskControllers from '../controllers/task';

//routing section

//post task
router.post('/api/users/:userEmail/tasks', taskControllers.postTask);

//get tasks
router.get('/api/users/:userEmail/tasks', taskControllers.getTasks);

//exporting section
export default router;