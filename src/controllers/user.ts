//core Modules
import fs from 'fs';
import path from 'path';

//third party packages and libraries
import {RequestHandler} from 'express';

//types
type TaskType = {
    title: string;
    isDone: string;
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
    const condition = users.find((u: UserType) => (u.userName === user.userName && u.email === user.email));
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

//controllers logic
const postUser: RequestHandler = async (req, res, next) => {
    await fs.readFile(dataBasePath, 'utf8', (error, stringifiedData) => {
        if(error){
            res.status(404).send({error: 'database not found'});
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


//exporting section
export default {postUser}