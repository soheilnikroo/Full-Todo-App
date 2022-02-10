//core Modules
import path from 'path';
import fs from 'fs';

//third party packages and libraries
import { v4 as uuidv4 } from 'uuid';

//types
type TaskType = {
    title: string;
    isDone: string;
};

//user class
class User {
    userName: string;
    email: string;
    password: string;
    id: string;
    toDos: TaskType[]
    constructor(userName: string, email: string, password: string){
        this.userName = userName,
        this.email = email,
        this.password = password,
        this.id = uuidv4(),
        this.toDos = []
    };
};



//exporting section
export default User