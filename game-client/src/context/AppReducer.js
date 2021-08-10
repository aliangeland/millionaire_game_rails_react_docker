export default function appReducer(state, action) {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };
    case "SET_USER_SCORE":
      state["user"]["score"] = action.score;
      return {
        ...state,
        user: state["user"],
      };
    default:
      return state;
  }
}
