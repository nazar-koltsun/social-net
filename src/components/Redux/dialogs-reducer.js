const ADD_MESSAGE = "ADD-MESSAGE";
const UPDATE_MESSAGE_TEXT = "UPDATE-MESSAGE-TEXT";

let initState = {
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
}

const dialogsReducer = (state = initState, action) => {
  switch (action.type) {
    case ADD_MESSAGE:
      return {
        ...state,
        messagesData: [...state.messagesData, {id: 5, message: state.newMessageText}],
        newMessageText: ""
      };

    case UPDATE_MESSAGE_TEXT:
      return {
        ...state,
        newMessageText: action.newText
      };

    default:
      return state;
  }
}

export const addMessageActionCreator = () => ({ type: ADD_MESSAGE });

export const updateMessageTextActionCreator = (text) => ({
  type: UPDATE_MESSAGE_TEXT,
  newText: text,
});

export default dialogsReducer;