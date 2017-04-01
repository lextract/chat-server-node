import { User, Conversation } from './models';

let autoIdUser = 0;
let autoIdConv = 0;

let users = new Map<string,User>();
let convs = new Map<number,Conversation>();

export function createUser(user: User){
    autoIdUser++;
    user.id=autoIdUser;
    users.set(user.email, user);
}

export function createConv(conv: Conversation){
    autoIdConv++;
    conv.id=autoIdConv;
    convs.set(conv.id,conv);
}

export function getUsers(){
    let retorno = [];
    for (let user of users.values())
        retorno.push(user);
    return retorno;
}

export function getConversations(idUser: number){
    let retorno = [];
    for (let conv of convs.values()){
        if (conv.users.indexOf(idUser) >= 0)
            retorno.push(conv);
    }
}

export function validateUser(email: string, password: string){
    let user = users.get(email);
    if (user && user.password == password)
        return true;
    else return false;
}

export function getUser(email: string){
    let user = users.get(email);
    return user;
}
