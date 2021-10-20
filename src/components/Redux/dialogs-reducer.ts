import { InferActionsTypes } from './redux-store';

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
    { id: 1, name: "Dimych"},
    {id: 2, name: "Olga" },
    {id: 3, name: "Sasha" },
    {id: 4, name: "Victor" },
    {id: 5, name: "Sveta" },
    {id: 6, name: "Petro" },
    {id: 7, name: "Valera" },
  ] as Array<DialogsDataType>,

  messages: [
    {id: 1, message: "Hi"},
    {id: 2, message: "How are you"},
    {id: 3, message: "You"},
    {id: 4, message: "1"},
    {id: 5, message: "1"},
    {id: 6, message: "1"},
    {id: 7, message: "1"},
  ] as Array<MessagesDataType>,
}

const dialogsReducer = (state = initState, action: ActionsType): InitialStateType => {
  switch (action.type) {
      case 'SN/DIALOGS/SEND_MESSAGE':
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

export const actions = {
  sendMessage: (newMessageBody: string) => ({ 
    type: 'SN/DIALOGS/SEND_MESSAGE',
    newMessageBody: newMessageBody
  } as const)
}

export default dialogsReducer;

export type InitialStateType = typeof initState;
type ActionsType = InferActionsTypes<typeof actions>