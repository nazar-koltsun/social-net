import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";

let store = {
  _state: {
    profilePage: {
      postsData: [
        { id: 1, message: "Hi, how are you", like: "10" },
        { id: 2, message: "It's me first post", like: "15" },
      ],

      newPostText: "it-kamasutra.com",
    },

    dialogsPage: {
      dialogsData: [
        { id: 1, name: "Dimych" },
        { id: 2, name: "Olga" },
        { id: 3, name: "Sasha" },
        { id: 4, name: "Victor" },
        { id: 5, name: "Sveta" },
        { id: 6, name: "Petro" },
        { id: 7, name: "Valera" },
      ],

      messagesData: [
        { id: 1, message: "Hi" },
        { id: 2, message: "How are you" },
        { id: 3, message: "You" },
        { id: 4, message: "1" },
        { id: 5, message: "1" },
        { id: 6, message: "1" },
        { id: 7, message: "1" },
      ],

      newMessageText: "",
    },
  },

  _callSubscriber() {
    console.log("State changed");
  },

  getState() {
    return this._state;
  },

  subscribe(observer) {
    this._callSubscriber = observer;
  },

  dispatch(action) {
    this._state.profilePage = profileReducer(this._state.profilePage, action);
    this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);

    this._callSubscriber();
  }
};

export default store;
window.store = store;
