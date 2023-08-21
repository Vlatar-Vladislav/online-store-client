import { combineReducers, configureStore } from "@reduxjs/toolkit";
import modalWindowsReducer from "./reducers/modalWindowsSlice"
import alertWindowsReducer from "./reducers/alertWindowsSlice"
import catalogPageReducer from "./reducers/catalogPageSlice"
import signinReducer from "./reducers/signinSlice"
import authReducer from "./reducers/authSlice"

const rootReducer = combineReducers({
    alertWindowsReducer,
    modalWindowsReducer,
    catalogPageReducer,
    signinReducer,
    authReducer,
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
    })
}
// export const store = configureStore({
//     reducer: rootReducer,
// })

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']