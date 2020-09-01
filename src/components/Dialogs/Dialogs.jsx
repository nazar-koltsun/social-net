import React from 'react';
import DialogItem from './DialogsItem/DialogsItem';
import Message from './Message/Message';
import s from './Dialogs.module.css';

const Dialogs = (props) => {
  console.log(props);
  let onMessageChange = (event) => {
    let text = event.target.value;
    props.onMessageChange(text);
  }

  let addMessage = () => {
    props.addMessage();
  }

  return (
    <section className={s.dialogs}>
      <h2>Dialogs</h2>
      <div className={s.wrapper}>
        <div className={s.usersBar}>
          <ul className={s.dialogItems}>
            {props.dialogsPage.dialogsData.map(item => {
              return <DialogItem id={item.id} key={item.id} name={item.name} />
            })}
          </ul>
        </div>
        <div className={s.messgesBar}>
          <ul className={s.messgesList}>
            {props.dialogsPage.messagesData.map(item => {
              return <Message id={item.id} key={item.id} message={item.message} />
            })}
          </ul>
          <textarea value={props.newMessageText} onChange={onMessageChange} cols="30" rows="10"></textarea>
          <button onClick={addMessage}>Add answer</button>
        </div>
      </div>
    </section>
  )
}

export default Dialogs;