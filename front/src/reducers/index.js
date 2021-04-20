import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import eventReducer from "./eventReducer";
import securityReducer from "./securityReducer"
import userReducer from "./userReducer"
import messageReducer from "./messageReducer"

export default combineReducers({
  errors: errorReducer,
  messages: messageReducer,
  events:eventReducer,
  security:securityReducer,
  users:userReducer,
});
