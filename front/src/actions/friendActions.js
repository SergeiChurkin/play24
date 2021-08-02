import axios from "axios";
import {
  GET_INVITES,
  GET_ERRORS,
  SEND_FRIEND_REQUEST,
  DELETE_REQUEST,
  ACCEPT_REQUEST,
  GET_FRIENDS,
  GET_FRIENDS_TO_INVITE
} from "./types";

export const getInvites = () => async (dispatch) => {
  const res = await axios.get("/api/friends/invites");
  dispatch({
    type: GET_INVITES,
    payload: res.data,
  });
};

export const sendFriendRequest = (email, history) => async (dispatch) => {
  try {
    const res = await axios.post(`/api/friends/invites/`, { email });
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

export const acceptFriendRequest = (id, refreshFriends) => async (dispatch) => {
  await axios.get(`/api/friends/accept/${id}`);
  refreshFriends();
  dispatch({
    type: ACCEPT_REQUEST,
    payload: id,
  });
  
};

export const getFriends = () => async (dispatch) => {
  const res = await axios.get("/api/friends/all");
  dispatch({
    type: GET_FRIENDS,
    payload: res.data,
  });
};

export const getFriendsReadyToInvite = (id) =>async (dispatch) =>{
const res = await axios.get(`/api/invites/${id}`)
dispatch({
  type: GET_FRIENDS_TO_INVITE,
  payload: res.data,
});

}
