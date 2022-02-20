//core Modules
import path from 'path';
import fs from 'fs';

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

//paths
const dataBasePath = path.join(__dirname, '..', 'DB', 'DB.json');


//helper functions
const userDuplicationPreventor = (users: UserType[], user: UserType) => {
    const condition = users.find((u: UserType) => ((u.email === user.email)));
    if(condition){
        return false;
    }else{
        return true;
    };
};

const taskDuplicationPreventor = (tasks: TaskType[], task: TaskType) => {
    const condition = tasks.find((t: TaskType) => t.title === task.title);
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
        };
    });
};

//exporting section
export default {userDuplicationPreventor, overWriteDataBase, taskDuplicationPreventor ,dataBasePath}