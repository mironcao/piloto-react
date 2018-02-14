import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import reducer from './reducer';

const rootReducer = combineReducers({
	bancoStore: reducer,
	form: formReducer
});

export default rootReducer;