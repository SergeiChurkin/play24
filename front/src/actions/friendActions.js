import axios from "axios";
import {GET_INVITES, GET_ERRORS, SEND_FRIEND_REQUEST,} from "./types"

export const getInvites = () => async (dispatch) => {
    try {
      await axios.get("/api/friends/invites");
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
  
  export const sendFriendRequest = (email, history) => async (dispatch) => {
    try {
      const res = await axios.post(`/api/friends/invite/`, { email });
      window.confirm("Запрос отправлен")
      history.push("/userInfo");
      dispatch({
        type: SEND_FRIEND_REQUEST,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    }
  };