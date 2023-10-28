import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { db, storage, auth } from "./firebase/config";
import Context,{ FireBaseContext} from "./store/Context";
ReactDOM.render(
  <FireBaseContext.Provider value={{ db, auth, storage }}>
    <Suspense fallback={<div>Loading...</div>}>
      <Context>
        <App />
      </Context>
    </Suspense>
  </FireBaseContext.Provider>,
  document.getElementById("root")
);
