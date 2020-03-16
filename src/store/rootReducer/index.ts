import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import studentsReducer from '../../components/students/reducer';

const rootReducer = (history: any) => combineReducers({
  router: connectRouter(history),
  studentsReducer,
});

type RootReducerType = typeof rootReducer;
type ReturnFromRootReducer = ReturnType<RootReducerType>;
export type AppStateType = ReturnType<ReturnFromRootReducer>;

export default rootReducer;
