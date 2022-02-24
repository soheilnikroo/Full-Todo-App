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
            const userTarget: UserType = dataBaseInstance.find((user: UserType) => user.email === req.params.userEmail);
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
                res.status(404).send({error: 'user not found'});
            };
        };
    });
};

//get users task based on email
const getTasks: RequestHandler = async (req, res) => {
    await fs.readFile(helperFunctions.dataBasePath, 'utf8', (error, stringifiedData) => {
        if(error){
            res.status(404).send({error: error});
        }else{
            const dataBaseInstance = JSON.parse(stringifiedData);
            const user = dataBaseInstance.find((user: UserType) => user.email === req.params.userEmail);
            if(user){
                res.status(200).send(user.toDos);
            }else{
                res.status(404).send({error: 'user not found'})
            };
        };
    });
};

//update task title and isDone state
const patchTask:RequestHandler = async (req, res) => {
    await fs.readFile(helperFunctions.dataBasePath, 'utf8', (error, stringifiedData) => {
        if(error){
            res.status(500).send({error: 'ERROR: unable to find database'});
        }else{
            const dataBaseInstance = JSON.parse(stringifiedData);
            const targetUser = dataBaseInstance.find((user: UserType) => user.email === req.params.userEmail);
            if(targetUser){
                const targetUserToDos = targetUser.toDos;
                // console.log(targetUserToDos);
                const targetTask = targetUserToDos.find((task: TaskType) => task.title === req.params.taskTitle);
                if(targetTask){
                    const newTitle = req.body.title, newIsDone = req.body.isDone;
                    if(newTitle) targetTask.title = newTitle;
                    if(newIsDone) targetTask.isDone = newIsDone;
                    // console.log(targetTask);
                    // console.log(targetUser);
                    // console.log(dataBaseInstance);
                    helperFunctions.overWriteDataBase(dataBaseInstance);
                    res.status(200).send({success: 'SUCCESS: changes has been implemented'});
                }else{
                    res.status(404).send({error: 'ERROR: task not found'});
                };
            }else{
                res.status(404).send({error: 'ERROR: user not found'});
            };
        };
    });
};

//delete task based on title search
const deleteTask: RequestHandler = async (req, res) => {
    await fs.readFile(helperFunctions.dataBasePath, 'utf8', (error, stringifiedData) => {
        if(error){
            res.status(500).send({error: 'ERROR: unable to find database'});
        }else{
            const dataBaseInstance = JSON.parse(stringifiedData);
            const target = dataBaseInstance.find((user: UserType) => user.email === req.params.userEmail);
            if(target){
                const userToDos = target.toDos
                const desiredTask = userToDos.find((task: TaskType) => task.title === req.params.taskTitle);
                if(desiredTask){
                    userToDos.splice(userToDos.indexOf(desiredTask), 1);
                    helperFunctions.overWriteDataBase(dataBaseInstance);
                    res.status(200).send({success: 'SUCCESS: task has been removed successfully'});
                }else{
                    res.status(404).send({error: 'ERROR: unable to find task'});
                };
            }else{
                res.status(404).send({error: 'ERROR: user not found'});
            };
        };
    });
};

//exporting section
export default {postTask, getTasks, patchTask, deleteTask};