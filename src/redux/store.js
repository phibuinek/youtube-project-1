import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk'; // Sử dụng xuất khẩu mặc định
import { authReducer } from './reducers/auth.reducer';
import { homeVideosReducer, searchVideosReducer } from './reducers/videos.reducer';

const rootReducer = combineReducers({
    auth: authReducer,
    homeVideos: homeVideosReducer,
    searchVideos: searchVideosReducer
});

const store = createStore(
    rootReducer,
    {},
    composeWithDevTools(applyMiddleware(thunk))
);

export default store;
