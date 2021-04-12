import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import eventReducer from "./eventReducer";
import securityReducer from "./securityReducer"
import userReducer from "./userReducer"

export default combineReducers({
  errors: errorReducer,
  events:eventReducer,
  security:securityReducer,
  users:userReducer,
});
