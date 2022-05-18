import {configureStore} from "@reduxjs/toolkit";
import appReducer from "./appReducer";
import thunkMiddleware from "redux-thunk";

export const store = configureStore({
    reducer:{
        app:appReducer,
    }
});
window.store = store;