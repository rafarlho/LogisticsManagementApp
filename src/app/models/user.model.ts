export enum UserType {
    "Factory Worker","Warehouse Operator","Production Line Manager"
}

export interface User {
    id:string
    password:string
    firstName:string
    lastName:string
    type: UserType
}