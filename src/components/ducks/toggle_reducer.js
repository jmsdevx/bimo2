const PROFILE = "PROFILE";
const WRITE = "WRITE";
const NOTES = "NOTES";
const VOCABULARY = "VOCABULARY";
const CHAT = "CHAT";
const SEARCH = "SEARCH";

const initialState = { toggle: ["PROFILE"] };

export function getToggle(val = "PROFILE") {
  console.log(val);
  return {
    type: val,
    payload: val
  };
}

export default function toggleReducer(state = initialState, action) {
  console.log(action);
  //   console.log("load: " + action.payload);
  switch (action.type) {
    case `${PROFILE}_FULFILLED`:
      return {
        toggle: action.payload
      };
    case WRITE:
      return {
        toggle: action.payload
      };

    case NOTES:
      return {
        toggle: action.payload
      };

    case VOCABULARY:
      return {
        toggle: action.payload
      };

    case CHAT:
      return {
        toggle: action.payload
      };

    case SEARCH:
      return {
        toggle: action.payload
      };
    default:
      return state;
  }
}
