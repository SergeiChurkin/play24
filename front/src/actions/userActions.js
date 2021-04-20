import axios from "axios";
import { GET_MY_INFO, GET_ERRORS } from "./types";

export const getMyInfo = () => async (dispatch) => {
  const res = await axios.get("/api/user/info");
  dispatch({
    type: GET_MY_INFO,
    payload: res.data,
  });
};

export const sendFriendRequest = (email, history) => async (dispatch) => {
  try {
    await axios.post(`/api/friends/invite/`, email);
    history.push("/userInfo");
    dispatch({
      type: GET_ERRORS,
      payload: {},
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};
