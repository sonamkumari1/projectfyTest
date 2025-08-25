import { combineReducers } from "@reduxjs/toolkit";
import { authApi } from "./features/api/authApi";
import authReducer from "./features/authSlice";
import { projectApi } from "./features/api/projectApi";
import { purchaseApi } from "./features/api/purchaseApi";
import { projectProgressApi } from "./features/api/projectProgressApi";

const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  [projectApi.reducerPath]: projectApi.reducer,
  [purchaseApi.reducerPath]: purchaseApi.reducer,
  [projectProgressApi.reducerPath]: projectProgressApi.reducer,
  auth: authReducer,
});

export default rootReducer;
