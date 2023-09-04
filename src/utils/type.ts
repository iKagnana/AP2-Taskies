type Pole = {
    name: string;
    img: string;
}

type Task = {
    title: string;
    status: number;
    assignee: string;
    desc?: string;
    files? : [];
    comment?: string;
    pole: string
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