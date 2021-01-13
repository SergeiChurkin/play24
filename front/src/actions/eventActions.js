import axios from "axios";
import { GET_ERRORS } from "./types";

export const createEvent = (eventItem, history) = async dispatch => {
  try {
    const res = await axios.post("http://localhost:8080/api/event", eventItem);
    history.push("/dashboard");
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data,
    });
  }
};
