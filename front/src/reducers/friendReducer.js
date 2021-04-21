import { GET_INVITES, SEND_FRIEND_REQUEST } from "../actions/types";


const initialState = {
    messages:[],
    invites:[]
};

export default function frined(state = initialState, action){
    switch (action.type) {
        case SEND_FRIEND_REQUEST:
          return {
            ...state,
            messages: action.payload,
          };
        case GET_INVITES:
          return {
            ...state,
            invites: action.payload,
          };
    
        default:
          return state;
      }
}