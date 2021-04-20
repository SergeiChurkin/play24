import {GET_MESSAGES} from "../actions/types";

const initialState = {};

export default function message(state = initialState, action) {
  switch (action.type) {
    case GET_MESSAGES:
      return action.payload;

    default:
      return state;
  }
}