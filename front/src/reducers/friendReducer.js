import {
  ACCEPT_REQUEST,
  DELETE_REQUEST,
  GET_FRIENDS,
  GET_INVITES,
} from "../actions/types";

const initialState = {
  invites: [],
  friends:[]
};

export default function friend(state = initialState, action) {
  switch (action.type) {
    case GET_INVITES:
      return {
        ...state,
        invites: action.payload,
      };
    case GET_FRIENDS:
      return {
        ...state,
        friends: action.payload,
      };
    case ACCEPT_REQUEST:
      return {
        ...state,
        invites: state.invites.filter((invite) => invite.id !== action.payload),
        
      };
    case DELETE_REQUEST:
      return {
        ...state,
        invites: state.invites.filter((invite) => invite.id !== action.payload),
      };
    default:
      return state;
  }
}
