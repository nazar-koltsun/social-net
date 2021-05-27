const SEND_MESSAGE = "SEND_MESSAGE";

type DialogsDataType = {
  id: number
  name: string
}

type MessagesDataType = {
  id: number
  message: string
}

let initState = {
  dialogsData: [
    { 
      id: 1, 
      name: "Dimych"
    },
    { 
      id: 2, 
      name: "Olga" 
    },
    { 
      id: 3, 
      name: "Sasha" 
    },
    { 
      id: 4, 
      name: "Victor" 
    },
    { 
      id: 5, 
      name: "Sveta" 
    },
    { 
      id: 6, 
      name: "Petro" 
    },
    { 
      id: 7, 
      name: "Valera" 
    },
  ] as Array<DialogsDataType>,

  messages: [
    { 
      id: 1, 
      message: "Hi" 
    },
    { 
      id: 2, 
      message: "How are you" 
    },
    { 
      id: 3, 
      message: "You" 
    },
    { 
      id: 4, 
      message: "1" 
    },
    { 
      id: 5, 
      message: "1" 
    },
    { 
      id: 6, 
      message: "1" 
    },
    { 
      id: 7, 
      message: "1" 
    },
  ] as Array<MessagesDataType>,
}

export type initialStateType = typeof initState

const dialogsReducer = (state = initState, action: ActionTypes): initialStateType => {
  switch (action.type) {
      case SEND_MESSAGE:
        let body = action.newMessageBody;
        return {
          ...state,
          messages: [...state.messages, {
            id: 8, 
            message: body}],
        };

    default:
      return state;
  }
}

type ActionTypes = SendMessageCreatorType

type SendMessageCreatorType = {
  type: typeof SEND_MESSAGE
  newMessageBody: string
}

export const sendMessageCreator = (newMessageBody: string): SendMessageCreatorType => ({ 
  type: SEND_MESSAGE,
  newMessageBody: newMessageBody
});

export default dialogsReducer;