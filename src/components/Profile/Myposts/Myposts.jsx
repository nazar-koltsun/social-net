import React from 'react';
import Post from './Post/Post';
import classes from './Myposts.module.css';
import { Field, reduxForm } from 'redux-form';
import {
    required,
    maxLengthCreator,
} from '../../../utils/validators/validators';
import { Textarea } from '../../common/FormControls/FormControls';

const Myposts = React.memo(props => {
    let postItems = props.posts.map((post) => (
        <Post message={post.message} likeCount={post.like} key={post.id} />
    ));

    let addNewPostMessage = (values) => {
        props.addPost(values.newPostText);
    };

    return (
        <div className={classes.postBlock}>
            <h2>My post</h2>
            <AddPostMessageReduxForm onSubmit={addNewPostMessage} />
            <ul className={classes.posts}>{postItems}</ul>
        </div>
    );
});

let maxLength10 = maxLengthCreator(10);

const AddNewPostForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field
                component={Textarea}
                name='newPostText'
                placeholder='Enter your message'
                validate={[required, maxLength10]}
            ></Field>
            <button className={classes.addPostBtn}>Add post</button>
        </form>
    );
};

const AddPostMessageReduxForm = reduxForm({
    form: 'addPostMessageForm',
})(AddNewPostForm);

export default Myposts;
