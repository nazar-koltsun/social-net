import React, { useEffect, useState } from 'react';

const ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');

type ChatMessageType = {
    message: string,
    photo: string,
    userId: number,
    userName: string
}

const ChatPage: React.FC = () => {
    return (
        <div>
            <Chat />
        </div>
    )
}

const Chat: React.FC = () => {
    return (
        <div>
            <Messages />
            <AddMessageForm />
        </div>
    )
}

const Messages: React.FC = () => {
    const [messages, setMessages] = useState<ChatMessageType[]>([]);

    useEffect( () => {
        ws.addEventListener('message', (e) => { 
            const newMessages = JSON.parse(e.data);
            setMessages((prevMessages) => [...prevMessages, ...newMessages]);
        })
    }, []);
    
    return (
        <div style={{maxHeight: '63vh', overflowY: 'auto'}}>
            {messages.map((message, index) => <Message key={index} message={message} />)}
        </div>
    )
}

const Message: React.FC<{message: ChatMessageType}> = ({message}) => {
    return (
        <div>
            <img src={message.photo} style={{width: '40px', height: '40px', objectFit: 'cover'}} alt="" />
            <b>{message.userName}</b>
            <p>{message.message}</p>
            <hr />
        </div>
    )
}

const AddMessageForm: React.FC = () => {
    const [message, setMessage] = useState('');
    const sendMessage = () => {
        if(!message) return;
        ws.send(message);
        setMessage('');
    }
    
    return (
        <div>
            <div>
                <textarea name="" id="" onChange={(e) => setMessage(e.currentTarget.value)} value={message}></textarea>
            </div>
            <button onClick={sendMessage}>send</button>
        </div>
    )
}

export default ChatPage;