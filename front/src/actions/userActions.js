import axios from "axios"
import {GET_MY_INFO, SEND_FRIEND_REQUEST} from "./types"

export const getMyInfo = () => async (dispatch) => {
    const res = await axios.get("/api/user/info");
    dispatch({
      type: GET_MY_INFO,
      payload: res.data,
    });
  };

  export const sendFriendRequest = (email,history) => async (dispatch) => {

    await axios.post(`/api/friends/invite/${email}`);
      history.push("/userInfo");
      dispatch({
        type: SEND_FRIEND_REQUEST,
        payload: email,
      });
    
  };