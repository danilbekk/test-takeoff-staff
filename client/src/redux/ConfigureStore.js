import { applyMiddleware, combineReducers, createStore } from "redux";
import contactReducer from "./features/contact";

import thunk from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension'


export const store = createStore(
  combineReducers({
    contacts: contactReducer,
  }),
  composeWithDevTools(
    applyMiddleware(thunk)
  )
);

