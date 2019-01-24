import axios from "axios";

export const GOOGLE_SIGNIN_REQUEST = "GOOGLE_SIGNIN_REQUEST";
export const GOOGLE_SIGNIN_ERROR = "GOOGLE_SIGNIN_ERROR";
export const GOOGLE_SIGNIN_LOADING = "GOOGLE_SIGNIN_LOADING";
export const GOOGLE_SIGNIN_SUCCESS = "GOOGLE_SIGNIN_SUCCESS";

//probabaly need actions to save token to local file storage

//actions govered by user

export function googleSignInRequest(credentials) {
  return {
    type: GOOGLE_SIGNIN_REQUEST,
    credentials: credentials
  }
}


export function googleSignInError(bool){
  return {
    type: GOOGLE_SIGNIN_ERROR,
    googleSignInError: bool
  }
}

export function googleSignInSuccess(bool){
  return {
    type: GOOGLE_SIGNIN_SUCCESS,
    googleSignInSuccess: bool
  }
}

export function googleSignInLoading(bool){
  return {
    type: GOOGLE_SIGNIN_LOADING,
    googleSignInLoading: bool
  }
}

export function initiateGoogleLogin(){
  return (dispatch) => {
    dispatch(googleSignInLoading(true))
    console.log('running');
    axios.get("http://localhost:3000/oauth/google/getToken/")
      .then(response => {
        if(response.status != 200){
          dispatch(googleSignInLoading(false))
          dispatch(googleSignInError(true))

          console.log('error: ', response)
        } else {
          dispatch(googleSignInLoading(false))
          dispatch(googleSignInSuccess(true))
          console.log('success: ', response);
        }
        //response should have a token on it to save
        console.log('response', response)
      })
  }
}
