import axios from "axios";
import { GET_MY_INFO, GET_ERRORS, } from "./types";

export const getMyInfo = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/user/info");
    dispatch({
      type: GET_MY_INFO,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

