//types and interfaces
interface TaskInterface {
    title: string;
    isDone: boolean;
};

//Task class
class Task implements TaskInterface{
    constructor(public title: string, public isDone: boolean){}
};


//exporing section
export default Task