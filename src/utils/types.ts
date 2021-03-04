export type ProjectType = {
    id: string,
    name: string,
    createdAt: Date
};

export type TaskType = {
    id: string,
    project: string,
    name: string,
    finished: boolean
};

export type AlertType = {
    message: string,
    category: 'success' | 'error'
};

export type ActionMap<M extends { [index: string]: any }> = {
    [Key in keyof M]: 
        M[Key] extends undefined ? { type: Key } :
        Extract<undefined, M[Key]> extends never ? { type: Key, payload: M[Key] } :
        { type: Key, payload?: M[Key] }
};

export type UserDecodedType = {
    id: string,
    username: string,
    email: string,
    createdAt: Date
};