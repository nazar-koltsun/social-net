import React, { useEffect, useState } from 'react';
import { SyntheticEvent } from 'react-router/node_modules/@types/react';

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
    const [wsChannel, setWsChannel] = useState<WebSocket | null>(null);

    useEffect(() => {
        let ws: WebSocket;

        const closeHandler = () => {
            console.log('Close WS');
            setTimeout(createChannel, 3000);
        }
        
        function createChannel() {
            ws?.removeEventListener('close', closeHandler);
            ws?.close();

            ws = (new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx'));
            ws.addEventListener('close', closeHandler)

            setWsChannel(ws);
        }

        createChannel();

        return () => {
            ws.removeEventListener('close', closeHandler);
            ws.close();
        }
    }, [])

    return (
        <div>
            <Messages wsChannel={wsChannel} />
            <AddMessageForm wsChannel={wsChannel} />
        </div>
    )
}

const Messages: React.FC<{wsChannel: WebSocket | null}> = ({wsChannel}) => {
    const [messages, setMessages] = useState<ChatMessageType[]>([]);

    useEffect( () => {
        const messageHandler = (e: any) => { 
            const newMessages = JSON.parse(e.data);
            setMessages((prevMessages) => [...prevMessages, ...newMessages]);
        }

        wsChannel?.addEventListener('message', messageHandler);

        return () => {
            wsChannel?.removeEventListener('message', messageHandler);
            wsChannel?.close();
        }
    }, [wsChannel]);
    
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

const AddMessageForm: React.FC<{wsChannel: WebSocket | null}> = ({wsChannel}) => {
    const [message, setMessage] = useState('');
    const [readyStatus, setReadyStatus] = useState<'pending' | 'ready'>('pending');

    useEffect(() => {
        let openHandler = () => {
            setReadyStatus('ready');
        }
        wsChannel?.addEventListener('open', openHandler);

        return () => {
            wsChannel?.removeEventListener('open', openHandler);
        }
    }, [wsChannel]);

    const sendMessage = () => {
        if(!message) return;
        wsChannel?.send(message);
        setMessage('');
    }
    
    return (
        <div>
            <div>
                <textarea name="" id="" onChange={(e) => setMessage(e.currentTarget.value)} value={message}></textarea>
            </div>
            <button disabled={wsChannel === null || readyStatus === 'pending'} onClick={sendMessage}>send</button>
        </div>
    )
}

export default ChatPage;