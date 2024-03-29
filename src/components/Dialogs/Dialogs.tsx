  
import React from 'react';
import s from './Dialogs.module.css';
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import AddMessageForm from "./AddMessageForm/AddMessageForm";
import { InitialStateType } from '../Redux/dialogs-reducer';

type OwnPropsType = {
    dialogsPage: InitialStateType 
    sendMessage: (messageText: string) => void
}

export type NewMessageFormValuesType = {
    newMessageBody: string
}

const Dialogs: React.FC<OwnPropsType> = (props) => {
    let state = props.dialogsPage;

    let dialogsElements = state.dialogsData.map( d => <DialogItem name={d.name} key={d.id} id={d.id} />  );
    let messagesElements = state.messages.map( m => <Message message={m.message} key={m.id} /> );

    let addNewMessage = (values: {newMessageBody: string}) => {
        props.sendMessage(values.newMessageBody);
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                { dialogsElements }
            </div>
            <div className={s.messages}>
                <div>{ messagesElements }</div>

            </div>
            <AddMessageForm onSubmit={addNewMessage} />
        </div>
    )
}

export default Dialogs;