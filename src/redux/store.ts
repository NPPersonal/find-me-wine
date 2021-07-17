import {createStore, Store, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import {createWrapper, Context} from 'next-redux-wrapper';
import { composeWithDevTools } from 'redux-devtools-extension';
import { wineReducer, WineState } from './reducers/wineReducer';



// Create middleware
const middleware = composeWithDevTools(applyMiddleware(...[thunk]));

//Root state
export type RootState = {
    wine: WineState,
};

// Combine reducers
const rootReducer = combineReducers<RootState>({
    wine: wineReducer,
});

// Create a make store function
const makeStore = (context: Context)=>createStore(rootReducer, middleware);

const wrapper = createWrapper<Store<RootState>>(makeStore, {debug:true});

export default wrapper;

