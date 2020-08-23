import React from 'react';
import s from './DialogsItem.module.css';
import { NavLink } from 'react-router-dom';

const DialogItem = (props) => {
  let path = "/dialogs/" + props.id;
  return (
    <li className={s.dialog}>
      <NavLink to={path}>{props.name}</NavLink>
    </li>
  )
}

export default DialogItem;