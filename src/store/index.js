import { createStore } from "redux";

// Define the initial state and the reducer function
const initialState = { name: "" };

const createReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_NAME":
      console.log("In store:", state.name);
      return { ...state, name: action.name };
    default:
      return state;
  }
};

// Create the Redux store
const store = createStore(createReducer);
store.subscribe(() => {
  console.log("Updated state:", store.getState());
});
export default store;
