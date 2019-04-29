const initialState = {
  users: [],
  isLoading: true
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case 'RECEIVE_USERS':
      return {
        ...state,
        users: action.payload,
        isLoading: false
      };
    default:
      return state;
  }
}
