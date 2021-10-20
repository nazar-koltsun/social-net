import React from 'react';
import classes from './Loader.module.css';
import LoaderImage from "../../../assets/img/loader.gif";

type PropsType = {};

const Loader: React.FC<PropsType> = () => {
  return <img className={classes.loader} src={LoaderImage} alt='Loader' />
}

export default Loader;
