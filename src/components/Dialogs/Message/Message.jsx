import React from 'react';
import s from './Message.module.css';

const Message = (props) => {
  return (
    <li className={s.messgesItem}>
      {props.message}
    </li>
  ) 
}

export default Message;