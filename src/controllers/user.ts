//core Modules
import fs from 'fs';
import path from 'path';

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
    id: string;
    toDos: TaskType[]
};


//paths
const dataBasePath = path.join(__dirname, '..', 'DB', 'DB.json');


//importing section
import User from '../models/user';

//helper functions
const duplicationPreventor = (users: UserType[], user: UserType) => {
    const condition = users.find((u: UserType) => ((u.userName === user.userName) || (u.email === user.email)));
    if(condition){
        return false;
    }else{
        return true;
    };
};

const overWriteDataBase = async (updatedDataBase: UserType[]) => {
    await fs.writeFile(dataBasePath, JSON.stringify(updatedDataBase), (error) => {
        if(error){
            console.log(error);
        }
    });
}

// controllers logic
const postUser: RequestHandler = async (req, res, next) => {
    await fs.readFile(dataBasePath, 'utf8', (error, stringifiedData) => {
        if(error){
            console.log(error);
            res.status(404).send({error: error});
        }else{
            const dataBaseInstance: UserType[] = JSON.parse(stringifiedData);
            const newUser = new User(req.body.userName, req.body.email, req.body.password);
            if(duplicationPreventor(dataBaseInstance, newUser)){
                dataBaseInstance.push(newUser);
                overWriteDataBase(dataBaseInstance);
                res.status(200).send(`${newUser.userName} has been added to database successfully`);
            }else{
                res.status(400).send({error: 'this user is already in the database'});
            };
        };
    });
};

const getUser: RequestHandler = async (req, res, next) => {
    await fs.readFile(dataBasePath, 'utf8', (error, stringifiedData) => {
        if(error){
            console.log(error);
            res.status(404).send({error: error});
        }else{
            const dataBaseInstance: UserType[] = JSON.parse(stringifiedData);
            const target = dataBaseInstance.find((user: UserType) => user.id === req.params.userId);
            if(target){
                res.status(200).send(target);
            }else{
                res.status(404).send({error: `user with id ${req.params.userId} not found`});
            };
        };
    });
};

const patchUser: RequestHandler = async (req, res, next) => {
    await fs.readFile(dataBasePath, 'utf8', (error, stringifiedData) => {
        if(error){
            console.log(error);
            res.status(404).send({error: error});
        }else{
            const dataBaseInstance: UserType[] = JSON.parse(stringifiedData);
            const target = dataBaseInstance.find((user: UserType) => user.id === req.params.userId);
            if(target){
                dataBaseInstance.splice(dataBaseInstance.indexOf(target), 1);
                const {userName, email, password} = req.body;
                if(password) target.password = password;
                if(userName) target.userName = userName;
                if(email) target.email = email;
                const noDuplicate = duplicationPreventor(dataBaseInstance, target);
                if(noDuplicate){
                    dataBaseInstance.push(target);
                    overWriteDataBase(dataBaseInstance);
                    res.status(200).send({success: 'changes has been implemented successfully'});
                }else{
                    res.status(400).send({error: `this username is already taken`});
                };
             }else{
                res.status(404).send({error: `user with id: ${req.params.userId} not found`});
            };
        };
    });
};


//exporting section
export default {postUser, getUser, patchUser}