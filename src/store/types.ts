import { rootReducer } from "./root-reducer";
import { store } from "./store";

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;
