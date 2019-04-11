import { RECEIVE_USERS } from "../constants/actionTypes";

const initialState = {
  users: ["Loading"]
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_USERS:
      return {
        ...state,
        users: action.payload
      };
    default:
      return state;
  }
}
