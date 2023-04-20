import { combineReducers } from "redux";
import userReducer from "./userReducer";
import articleReducer from "./articleReducer";

//creating  root reeducer
const rootReducer = combineReducers({
    userState : userReducer,
    articleState:articleReducer,
});

export default rootReducer;