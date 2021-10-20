import React from 'react';
import s from './Message.module.css';

type PropsType = {
  message: string
}

const Message: React.FC<PropsType> = (props) => {
  return (
    <li className={s.messgesItem}>
      {props.message}
    </li>
  ) 
}

export default Message;