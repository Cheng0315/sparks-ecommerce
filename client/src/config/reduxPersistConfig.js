import storage from "redux-persist/lib/storage";

/* Redux Persist Configuration */
/* Store only data in whitelist in local storage */
const reduxPersistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "cart", "guestCart"],
};

export default reduxPersistConfig;