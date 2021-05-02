import { DELETE_REQUEST, GET_INVITES } from "../actions/types";

const initialState = {
  invites: [],
};

export default function friend(state = initialState, action) {
  switch (action.type) {
    case GET_INVITES:
      return { 
        ...state, 
        invites: action.payload 
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
