import { combineReducers } from 'redux';
import currentGame from './currentGame';
import user from './user';

const rootReducer = combineReducers({
  currentGame,
  user,
})

// {
//   currentGame: // a peice of global state
// }

export default rootReducer;