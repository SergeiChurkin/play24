import { GET_MY_INFO, SEND_FRIEND_REQUEST } from "../actions/types";

const initialState = {
  user: {},
};
const booleanActionPayload = (payload) => {
  if (payload) {
    return true;
  } else {
    return false;
  }
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case GET_MY_INFO:
      return {
        ...state,
        user: action.payload,
      };
    case SEND_FRIEND_REQUEST:
      return {
        ...state,
        //validToken:booleanActionPayload(action.payload),
        user: state.user,
      };

    default:
      return state;
  }
}
