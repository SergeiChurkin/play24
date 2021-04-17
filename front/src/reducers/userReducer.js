import { GET_MY_INFO, SEND_FRIEND_REQUEST } from "../actions/types";

const initialState = {
  user: {},
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
        user: state.user,
      };

    default:
      return state;
  }
}
