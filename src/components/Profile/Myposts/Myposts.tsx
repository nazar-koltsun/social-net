import React from 'react';
import Post from './Post/Post';
import classes from './Myposts.module.css';
import AddPostForm, { AddPostFormValuesType } from './AddPostForm/AddPostForm';
import { PostsType } from '../../../types/types';

export type MapPropsType = {
    posts: Array<PostsType>
}

export type DispatchPropsType = {
    addPost: (newPostText: string) => void
}

const Myposts: React.FC<MapPropsType & DispatchPropsType> = (props => {
    let postItems = props.posts.map((post) => (
        <Post message={post.message} like={post.like} key={post.id} />
    ));

    let addNewPostMessage = (values: AddPostFormValuesType) => {
        props.addPost(values.newPostText);
    };

    return (
        <div className={classes.postBlock}>
            <h2>My post</h2>
            <AddPostForm onSubmit={addNewPostMessage} />
            <ul className={classes.posts}>{postItems}</ul>
        </div>
    );
});

const MypostsMemorized = React.memo(Myposts);

export default MypostsMemorized;
