//core Modules
import fs from 'fs';

//third party packages and libraries
import {RequestHandler} from 'express';

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

//importing section
import User from '../models/user';
import helperFunctions from '../helpers/helperFunctions';


// controllers logic
const postUser: RequestHandler = async (req, res, next) => {
    await fs.readFile(helperFunctions.dataBasePath, 'utf8', (error, stringifiedData) => {
        if(error){
            console.log(error);
            res.status(404).send({error: error});
        }else{
            const dataBaseInstance: UserType[] = JSON.parse(stringifiedData);
            const newUser = new User(req.body.email, req.body.password);
            const duplicationCheck = helperFunctions.userDuplicationPreventor(dataBaseInstance, newUser);
            if(duplicationCheck){
                dataBaseInstance.push(newUser);
                helperFunctions.overWriteDataBase(dataBaseInstance)
                res.status(200).send({success:`${newUser.userName} has been added to database successfully`});
            }else{
                res.status(400).send({error: 'this user is already in the database'});
            };
        };
    });
};

const getUser: RequestHandler = async (req, res, next) => {
    await fs.readFile(helperFunctions.dataBasePath, 'utf8', (error, stringifiedData) => {
        if(error){
            console.log(error);
            res.status(404).send({error: error});
        }else{
            const dataBaseInstance: UserType[] = JSON.parse(stringifiedData);
            const target = dataBaseInstance.find((user: UserType) => user.email === req.params.userEmail);
            if(target){
                res.status(200).send(target);
            }else{
                res.status(404).send({error: 'user not found'});
            };
        };
    });
};

const patchUser: RequestHandler = async (req, res, next) => {
    await fs.readFile(helperFunctions.dataBasePath, 'utf8', (error, stringifiedData) => {
        if(error){
            console.log(error);
            res.status(404).send({error: error});
        }else{
            const dataBaseInstance: UserType[] = JSON.parse(stringifiedData);
            const target = dataBaseInstance.find((user: UserType) => user.email === req.params.userEmail);
            if(target){
                dataBaseInstance.splice(dataBaseInstance.indexOf(target), 1);
                const {userName, email, password} = req.body;
                if(password) target.password = password;
                if(userName) target.userName = userName;
                if(email) target.email = email;
                const noDuplicate = helperFunctions.userDuplicationPreventor(dataBaseInstance, target);
                if(noDuplicate){
                    dataBaseInstance.push(target);
                    helperFunctions.overWriteDataBase(dataBaseInstance);
                    res.status(200).send({success: 'changes has been implemented successfully'});
                }else{
                    res.status(400).send({error: 'this email is already exists'});
                };
             }else{
                res.status(404).send({error: `user not found`});
            };
        };
    });
};

const deleteUser: RequestHandler = async (req, res, next) => {
    await fs.readFile(helperFunctions.dataBasePath, 'utf8', (error, stringifiedData) => {
        if(error){
            res.status(404).send({error: error});
        }else{
            const dataBaseInstance = JSON.parse(stringifiedData);
            const target = dataBaseInstance.find((user: UserType) => user.email === req.params.userEmail);
            if(target){
                dataBaseInstance.splice(dataBaseInstance.indexOf(target), 1);
                helperFunctions.overWriteDataBase(dataBaseInstance);
                res.status(200).send({success: `${target.userName} has been removed from database successfully`});
            }else{
                res.status(404).send({error: 'user not found'});
            };
        };
    });
};

//exporting section
export default {postUser, getUser, patchUser, deleteUser};