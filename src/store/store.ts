import { configureStore } from "@reduxjs/toolkit";
import NoteReducer from "./noteSlice"
export const store = configureStore({
    reducer: {
        note: NoteReducer
    }
})
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>