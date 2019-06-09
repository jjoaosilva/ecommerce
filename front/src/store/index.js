import { createStore } from "redux";
import { persistStore, persistReducer} from "redux-persist"
import { CookieStorage } from 'redux-persist-cookie-storage'
import Cookies from 'cookies-js'

import reducers from "./ducks";

const persistConfig = {
    key: "root",
    storage: new CookieStorage(Cookies)
}

const persistedReducer = persistReducer(persistConfig, reducers)

const store = createStore(persistedReducer);
const persistor = persistStore(store)
export {store, persistor};