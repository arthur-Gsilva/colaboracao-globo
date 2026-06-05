import { Message } from "../types/message";

export const sendMessage = (data: Message) => {
    try{
        console.log(data)
    } catch(err){
        console.error(err)
    }
}