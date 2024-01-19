
export enum Status {
    Requested,Collection,Sent,Recieved
} 

export interface Request {
    id:number
    goodsId:{id:string ,quantity:number}[]
    status:Status
    emitter:string
    handler?:string
    latestUpdate:string
}