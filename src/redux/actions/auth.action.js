import firebase from "firebase/compat/app";
import { auth } from "../../firebase";
import { LOAD_PROFILE, LOGIN_REQUEST, LOGIN_SUCCESS } from "../actionType";

export const loginRequest = () => ({
  type: 'LOGIN_REQUEST'
});

export const loginSuccess = (user) => ({
  type: 'LOGIN_SUCCESS',
  payload: user
});

export const loginFail = (error) => ({
  type: 'LOGIN_FAIL',
  payload: error
});

export const login = () => async dispatch => {
  dispatch({
    type: LOGIN_REQUEST,
  });
  try {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope("https://www.googleapis.com/auth/youtube.force-ssl")
    const res = await auth.signInWithPopup(provider);
    const user = res.user;
    dispatch(loginSuccess(user));
    // console.log(res);
    const accessToken = res.credential.accessToken
    const profile = {
        name:res.additionalUserInfo.profile.name,
        photoURL:res.additionalUserInfo.profile.picture,
    }
    sessionStorage.setItem("yt-access-token",accessToken)
    sessionStorage.setItem("yt-user",JSON.stringify(profile))
    dispatch({
        type:LOGIN_SUCCESS,
        payload:accessToken
    })
    dispatch({
        type:LOAD_PROFILE,
        payload:profile
    })
  } catch (error) {
    dispatch(loginFail(error.message));
    console.error("Login failed:", error.message);
  }
};