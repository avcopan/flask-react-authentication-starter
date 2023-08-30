import axios from "axios";
import { configureStore, createSlice } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { put, takeLatest } from "redux-saga/effects";

// SLICES/REDUCERS
// 1. user slice/reducer
const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    setUser: (_, action) => {
      return action.payload;
    },
    unsetUser: () => {
      return null;
    },
  },
});

const setUser = userSlice.actions.setUser;
const unsetUser = userSlice.actions.unsetUser;
const userReducer = userSlice.reducer;

// 2. error slice/reducer
const errorSlice = createSlice({
  name: "error",
  initialState: "",
  reducers: {
    setLoginError: () => {
      return "Your credentials were not accepted. Please try again.";
    },
    setRegistrationError: () => {
      return "This email is already registered. Please log in instead.";
    },
    setRetypeError: () => {
      return "The re-typed password does not match. Please try again.";
    },
    setCodelessError: () => {
      return "Something isn't right on the server...";
    },
    clearError: () => {
      return "";
    },
  },
});

const setLoginError = errorSlice.actions.setLoginError;
const setRegistrationError = errorSlice.actions.setRegistrationError;
export const setRetypeError = errorSlice.actions.setRetypeError;
const setCodelessError = errorSlice.actions.setCodelessError;
const setClearError = errorSlice.actions.clearError;
const errorReducer = errorSlice.reducer;

// WIRING: create saga middleware
const sagaMiddleware = createSagaMiddleware();

// WIRING: create store
const store = configureStore({
  reducer: {
    user: userReducer,
    error: errorReducer,
  },
  middleware: (defaultMiddleware) => defaultMiddleware().concat(sagaMiddleware),
});

// SAGAS
// 1. user saga
//    a. get the user
const GET_USER = "GET_USER";

function* getUserSaga() {
  try {
    const res = yield axios.get("/api/@me");
    const data = yield res.data;
    yield put(setUser(data.contents));
  } catch (error) {
    console.error(error);
  }
}

export const getUser = () => {
  return { type: GET_USER };
};

//    b. login the user
const LOGIN_USER = "LOGIN_USER";

function* loginUserSaga(action) {
  try {
    yield put(setClearError());
    yield axios.post("/api/login", action.payload);
    yield put(getUser());
  } catch (error) {
    console.error(error);
    if (error.response.status === 401) {
      yield put(setLoginError());
    } else {
      yield put(setCodelessError());
    }
  }
}

export const loginUser = (payload) => {
  return { type: LOGIN_USER, payload };
};

//    c. logout the user
const LOGOUT_USER = "LOGOUT_USER";

function* logoutUserSaga() {
  try {
    yield axios.post("/api/logout");
    yield put(unsetUser());
  } catch (error) {
    console.error(error);
  }
}

export const logoutUser = () => {
  return { type: LOGOUT_USER };
};

//    b. register the user
const REGISTER_USER = "REGISTER_USER";

function* registerUserSaga(action) {
  try {
    yield put(setClearError());
    yield axios.post("/api/register", action.payload);
    yield put(getUser());
  } catch (error) {
    console.error(error);
    if (error.response.status === 409) {
      yield put(setRegistrationError());
    } else {
      yield put(setCodelessError());
    }
  }
}

export const registerUser = (payload) => {
  return { type: REGISTER_USER, payload };
};

// WIRING: create watcher saga
function* watcherSaga() {
  // user
  yield takeLatest(GET_USER, getUserSaga);
  yield takeLatest(LOGIN_USER, loginUserSaga);
  yield takeLatest(LOGOUT_USER, logoutUserSaga);
  yield takeLatest(REGISTER_USER, registerUserSaga);
}

// WIRING: run watcher saga
sagaMiddleware.run(watcherSaga);

export default store;
