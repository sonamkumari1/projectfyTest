import { configureStore } from "@reduxjs/toolkit";
import rootRedcuer from "./rootReducer";
import { authApi } from "./features/api/authApi";
import { projectApi } from "./features/api/projectApi";
import { purchaseApi } from "./features/api/purchaseApi";
import { projectProgressApi } from "./features/api/projectProgressApi";

export const appStore = configureStore({
  reducer: rootRedcuer,
  middleware: (defaultMiddleware) =>
    defaultMiddleware().concat(authApi.middleware, projectApi.middleware, purchaseApi.middleware, projectProgressApi.middleware),
});

const initializeApp = async () => {
  await appStore.dispatch(
    authApi.endpoints.loadUser.initiate({}, { forceRefetch: true })
  );
};
initializeApp();