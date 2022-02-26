import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from '../reducers';
import ReduxThunk from 'redux-thunk';

const store = createStore(rootReducer, composeWithDevTools(
    applyMiddleware(ReduxThunk)
));

export default store;