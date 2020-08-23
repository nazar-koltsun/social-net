import React from 'react';
import classes from './Post.module.css';

function Post(props) {
  return (
    <li className={classes.item}>
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS4kP9cKVsfJYvj7cxt6uBNI9dXjPTALxEpADtDsxFGRZpkdP6w" alt="user-avatar" />
      {props.message}
      <button>like: {props.likeCount}</button>
    </li>
  );
}

export default Post;
