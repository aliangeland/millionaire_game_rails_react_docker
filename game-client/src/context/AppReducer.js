export default function appReducer(state, action) {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };
    case "SET_USER_SCORE":
      console.log("zzz:" + action.score);
      state["user"]["score"] = action.score;
      console.log(state);

      return {
        ...state,
        user: state["user"],
      };
    default:
      return state;
  }
}
