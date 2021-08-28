import profileReducer, { actions } from './profile-reducer';

let state = {
    posts: [
        { id: 1, message: 'Hi, how are you', like: 10 },
        { id: 2, message: "It's me first post", like: 15 },
    ],

    profile: null,
    status: '',
};

test('length of posts should be incremented', () => {
    let action = actions.addPostActionCreator('it-kamasutra.com');
    let newState = profileReducer(state, action);

    expect(newState.posts.length).toBe(3);
});

test('message of new post shoult be corrent', () => {
    let action = actions.addPostActionCreator('it-kamasutra.com');
    let newState = profileReducer(state, action);

    expect(newState.posts[2].message).toBe('it-kamasutra.com');
});

test('after deleting length of messages should be decrement', () => {
    let action = actions.deletePost(1);
    let newState = profileReducer(state, action);

    expect(newState.posts.length).toBe(1);
});

test("after deleting length shouldn't be decrement if id is incorrent", () => {
    let action = actions.deletePost(20);
    let newState = profileReducer(state, action);

    expect(newState.posts.length).toBe(2);
});
