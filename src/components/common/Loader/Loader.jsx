import React from 'react';
import classes from './Loader.module.css';
import LoaderImage from "../../../assets/img/loader.gif";

function Loader() {
  return <img className={classes.loader} src={LoaderImage} />
}

export default Loader;
