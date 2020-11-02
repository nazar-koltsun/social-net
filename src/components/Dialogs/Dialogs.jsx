import React from 'react';
import DialogItem from './DialogsItem/DialogsItem';
import Message from './Message/Message';
import s from './Dialogs.module.css';
import { Field, reduxForm } from 'redux-form';
import {
    required,
    maxLengthCreator,
} from '../../utils/validators/validators';
import { Textarea } from '../common/FormControls/FormControls';

let maxLength20 = maxLengthCreator(20);

const Dialogs = (props) => {
    const addNewMessage = (values) => {
      props.sendMessage(values.newMessageBody);
    }

    return (
        <section className={s.dialogs}>
            <h2>Dialogs</h2>
            <div className={s.wrapper}>
                <div className={s.usersBar}>
                    <ul className={s.dialogItems}>
                        {props.dialogsPage.dialogsData.map((item) => {
                            return (
                                <DialogItem
                                    id={item.id}
                                    key={item.id}
                                    name={item.name}
                                />
                            );
                        })}
                    </ul>
                </div>
                <div className={s.messgesBar}>
                    <ul className={s.messgesList}>
                        {props.dialogsPage.messages.map((item) => {
                            return (
                                <Message
                                    id={item.id}
                                    key={item.id}
                                    message={item.message}
                                />
                            );
                        })}
                    </ul>
                   <AddMessageReduxForm onSubmit={addNewMessage} />
                </div>
            </div>
        </section>
    );
};

const AddMessageForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field
                component={Textarea}
                name="newMessageBody"
                placeholder="Enter your message"
                cols="30"
                rows="10"
                validate={[required, maxLength20]}
            ></Field>
            <button>Add answer</button>
        </form>
    );
};

const AddMessageReduxForm = reduxForm({
    form: 'dialogAddMessageForm',
})(AddMessageForm);

export default Dialogs;
