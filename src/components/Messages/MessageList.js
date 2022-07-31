import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { getAllMessages } from "../modules/MessageManager";
import { MessageForm } from "./MessageForm";


export const MessageList = () => {
 const [messages, setMessages] = useState([]);
 const navigate = useNavigate();  
 
 const getMessages = () => {
     return getAllMessages().then(messages =>{
         setMessages(messages)
     } )
 }

 useEffect(() => {
     getMessages()
 }, []);

    return (
     <>
     <button type ="button"
     className="btn"
     onClick={() => {navigate("/")}}>
         New Message
     </button>
     </>
 )
}