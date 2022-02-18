//core Modules
import fs from 'fs';

//third party packages and libraries
import {RequestHandler} from 'express';

//importing section
import Task from '../models/task';
import helperFunctions from '../helpers/helperFunctions';

//types
type TaskType = {
    title: string;
    isDone: boolean;
};

type UserType = {
    userName: string;
    email: string;
    password: string;
    id: string;
    toDos: TaskType[]
};

//controllers section

//create new task for specific user
const postTask: RequestHandler = async (req, res) => {
    await fs.readFile(helperFunctions.dataBasePath, 'utf8', (error, stringifiedData) => {
        if(error){
            res.status(404).send({error: error});
        }else{
            const dataBaseInstance = JSON.parse(stringifiedData);
            const userTarget: UserType = dataBaseInstance.find((user: UserType) => user.id === req.params.userId);
            if(userTarget){
                const newTask = new Task(req.body.title, false);
                const duplicationCheck = helperFunctions.taskDuplicationPreventor(userTarget.toDos, newTask);
                if(duplicationCheck){
                    (userTarget.toDos).push(newTask);   
                    helperFunctions.overWriteDataBase(dataBaseInstance);
                    res.status(200).send({success: `task with title '${newTask.title}' has been added to ${userTarget.userName} toDos successfully`});
                }else{
                    res.status(400).send({error: `task with title: '${newTask.title}' is already existed!`})
                };

            }else{
                res.status(404).send({error: `user with id ${req.params.userId} not found`});
            };
        };
    });
};

//get users task based on id
const getTasks: RequestHandler = async (req, res) => {
    await fs.readFile(helperFunctions.dataBasePath, 'utf8', (error, stringifiedData) => {
        if(error){
            res.status(404).send({error: error});
        }else{
            const dataBaseInstance = JSON.parse(stringifiedData);
            const user = dataBaseInstance.find((user: UserType) => user.id === req.params.userId);
            if(user){
                res.status(200).send(user.toDos);
            }else{
                res.status(404).send({error: 'user not found'})
            };
        };
    });
};

//exporting section
export default {postTask, getTasks};