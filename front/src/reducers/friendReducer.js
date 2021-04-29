import { GET_INVITES } from "../actions/types";

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

    default:
      return state;
  }
}
