export interface InitialState {
    data: User[],
    loading: boolean,
    error: any
}

export interface User {
    name: string,
    age: number,
    id: number
}