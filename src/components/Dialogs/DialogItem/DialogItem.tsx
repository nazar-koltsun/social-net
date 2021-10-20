import React from 'react';
import s from './DialogsItem.module.css';
import { NavLink } from 'react-router-dom';

type PropsType = {
  id: number
  name: string
}

const DialogItem: React.FC<PropsType> = (props) => {
  let path = "/dialogs/" + props.id;
  return (
    <li className={s.dialog}>
      <NavLink to={path}>{props.name}</NavLink>
    </li>
  )
}

export default DialogItem;