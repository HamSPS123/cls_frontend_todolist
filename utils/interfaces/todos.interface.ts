export interface Todo {
    id?:          number;
    title?:       string;
    description?: string;
    status?:      string;
    user?:        User;
    dateline?:    string;
}

export interface User {
    id?:        number;
    firstname?: string;
    lastname?:  string;
}