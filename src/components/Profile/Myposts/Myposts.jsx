import React from 'react';
import Post from './Post/Post';
import classes from './Myposts.module.css';

function Myposts(props) {
  let postItems = props.posts
    .map(post => <Post message={post.message} likeCount = {post.like} key={post.id} />
  )

  let onAddPost = () => {
    props.addPost();
  }

  let onPostChange = (event) => {
    let text = event.target.value;
    props.onPostChange(text);
  }

  return (
    <div className={classes.postBlock}>
      <h2>My post</h2>
      <div>
        <textarea onChange={onPostChange} value={props.newPostText}></textarea>
        <button className={classes.addPostBtn} onClick={onAddPost}>Add post</button>
      </div>
      <ul className={classes.posts}>
        {postItems}
      </ul>
    </div>
  );
}

export default Myposts;
