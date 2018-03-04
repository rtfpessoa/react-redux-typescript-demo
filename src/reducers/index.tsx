// src/reducers/index.tsx

import { combineReducers, Reducer } from 'redux';
import { Action } from '../actions';
import { StoreState, SubReddit } from '../types/index';
import { RECEIVE_POSTS, REQUEST_POSTS, INVALIDATE_SUBREDDIT, SELECT_SUBREDDIT } from '../constants/index';

function selectedSubreddit(state: string = 'scala', action: Action): string {
  switch (action.type) {
    case SELECT_SUBREDDIT:
      return action.subreddit;
    default:
      return state;
  }
}

function posts(state: SubReddit = { isFetching: false, didInvalidate: false, items: [] }, action: Action): SubReddit {
  switch (action.type) {
    case INVALIDATE_SUBREDDIT:
      return {
        ...state,
        didInvalidate: true
      };
    case REQUEST_POSTS:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      };
    case RECEIVE_POSTS:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        items: action.posts,
        lastUpdated: action.receivedAt
      };
    default:
      return state;
  }
}

function postsBySubreddit(state: object = {}, action: Action): object {
  switch (action.type) {
    case INVALIDATE_SUBREDDIT:
    case RECEIVE_POSTS:
    case REQUEST_POSTS:
      return {
        ...state,
        [action.subreddit]: posts(state[action.subreddit], action)
      };
    default:
      return state;
  }
}

const rootReducer: Reducer<StoreState> = combineReducers({
  postsBySubreddit,
  selectedSubreddit
});

export default rootReducer;
