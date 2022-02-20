//types
type TaskType = {
    title: string;
    isDone: boolean;
};

//user class
class User {
    userName: string;
    email: string;
    password: string;
    toDos: TaskType[]
    constructor(email: string, password: string){
        this.email = email,
        this.password = password,
        this.userName = (this.email).split('@')[0];
        this.toDos = []
    };
};



//exporting section
export default User