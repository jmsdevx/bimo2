const axios = require("axios");

const GET_USER = "GET_USER";

export function getUser() {
  return {
    type: GET_USER,
    payload: axios.get("/api/user").then(response => response.data)
  };
}
const initialState = {
  user: []
};

export default function userReducer(state = initialState, action) {
  console.log("load: " + action.payload);
  switch (action.type) {
    case `${GET_USER}_FULFILLED`:
      return {
        ...state,
        user: action.payload
      };

    default:
      return state;
  }
}
