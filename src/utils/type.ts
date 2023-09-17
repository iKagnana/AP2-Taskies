type Pole = {
    name: string;
    img: string;
}

type Task = {
    _id?: string;
    index: number;
    title: string;
    status: string;
    assignee: string;
    desc?: string;
    files? : string[];
    comment?: string;
    pole: string;
}

type User = {
    _id ?: string
    lastname: string;
    firstname: string;
    email: string;
    password: string;
    pole: string;
    tasks: [Task];
    role: number
}

export type {Pole, Task, User}