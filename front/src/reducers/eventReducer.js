import { DELETE_EVENT, GET_EVENTS } from "../actions/types";
import { GET_EVENT } from "../actions/types";

const initialState = {
  events: [],
  eventTypes:[],
  event: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_EVENTS:
      return {
        ...state,
        events: action.payload,
        
      };

    case GET_EVENT:
      return {
        ...state,
        event: action.payload,
        eventTypes:action.payload,
      };
    case DELETE_EVENT:
      return {
        ...state,
        events: state.events.filter((event) => event.id !== action.payload),
      };
    default:
      return state;
  }
}
