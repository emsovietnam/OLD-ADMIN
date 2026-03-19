import { combineReducers } from 'redux';
import { appReducer } from './app';
import { loginReducer } from './login';
import { meReducer } from './meReducer';
import { socialPostReducer } from './socialPostReducer';

const rootReducer = combineReducers({
  loginReducer,
  appReducer,
  meReducer,
  socialPostReducer
  // settingReducer
});

export default rootReducer;
