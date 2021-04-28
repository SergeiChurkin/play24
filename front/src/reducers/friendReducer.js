import { GET_INVITES, SEND_FRIEND_REQUEST } from "../actions/types";

const initialState = {
  invites: [],
};

export default function friend(state = initialState, action) {
  switch (action.type) {
    case GET_INVITES:
      return { invites: action.payload };

    default:
      return state;
  }
}
