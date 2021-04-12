import axios from "axios"
import {GET_MY_INFO, SEND_FRIEND_REQUEST} from "./types"

export const getMyInfo = () => async (dispatch) => {
    const res = await axios.get("/api/user/info");
    dispatch({
      type: GET_MY_INFO,
      payload: res.data,
    });
  };

  export const sendFriendRequest = (email) => async (dispatch) => {
    if (window.confirm("Отправить запрос в друзья?")) {
      await axios.delete(`/api/user/invite/${email}`);
      dispatch({
        type: SEND_FRIEND_REQUEST,
        payload: {},
      });
    }
  };