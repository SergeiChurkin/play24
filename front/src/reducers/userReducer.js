import {
  GET_MY_INFO,
} from "../actions/types";

const initialState = {
  user:{}
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case GET_MY_INFO:
      return {
        ...state,
        user: action.payload,
      };

    default:
      return state;
  }
}
