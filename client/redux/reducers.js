import { combineReducers } from 'redux';


import { GOOGLE_SIGNIN_REQUEST } from "./actions";
import GOOGLE_SIGNIN_ERROR from "./actions";
import GOOGLE_SIGNIN_LOADING from "./actions";
import GOOGLE_SIGNIN_SUCCESS from "./actions";


function authenticate( state = {isFetching: false,isAuthenticated: false}, action ){
  switch (action.type) {
    case GOOGLE_SIGNIN_SUCCESS:
      return Object.assign({},state,{
        isAuthenticated: true,
        credentials: action.credentials
      })

    case GOOGLE_SIGNIN_ERROR:
      return Object.assign({}, state,{
        isAuthenticated: state.hasErrored,
        errorMessage: action.errorMessage
      })
    case GOOGLE_SIGNIN_LOADING:
      return Object.assign({}, state,{
        isLoading: state.isLoading,

      })
    default:
      return state;
  }
}

export default combineReducers({
  authenticate
});
