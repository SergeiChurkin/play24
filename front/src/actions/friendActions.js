import axios from "axios";
import { GET_INVITES, GET_ERRORS, SEND_FRIEND_REQUEST, DELETE_REQUEST } from "./types";

export const getInvites = () => async (dispatch) => {
  const res = await axios.get("/api/friends/invites");
  dispatch({
    type: GET_INVITES,
    payload: res.data,
  });
};

export const sendFriendRequest = (email, history) => async (dispatch) => {
  try {
    const res = await axios.post(`/api/friends/invite/`, { email });
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

export const deleteFriendRequest = (id) => async (dispatch) => {
  if (window.confirm("Удалить запрос в друзья?")) {
    await axios.delete(`/api/friends/invites/${id}`);
    dispatch({
      type: DELETE_REQUEST,
      payload: id,
    });
  }
};
