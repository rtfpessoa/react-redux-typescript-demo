// src/reducers/index.tsx

import { combineReducers, Reducer } from 'redux';
import { RedditAction } from '../actions';
import { StoreState, SubReddits, RedditPost } from '../types/index';
import { RECEIVE_POSTS, REQUEST_POSTS, INVALIDATE_SUBREDDIT, SELECT_SUBREDDIT } from '../constants/index';

import { routerReducer } from 'react-router-redux';

function selectedSubreddit(
  state: string = 'scala',
  action: RedditAction
): string {
  switch (action.type) {
    case SELECT_SUBREDDIT:
      return action.subreddit;
    default:
      return state;
  }
}

function postsBySubreddit(
  state: SubReddits = { isFetching: false, didInvalidate: false, items: new Map<string, RedditPost[]>() },
  action: RedditAction
): SubReddits {
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
        items: new Map(state.items).set(action.subreddit, action.posts),
        lastUpdated: action.receivedAt
      };
    default:
      return state;
  }
}

const rootReducer: Reducer<StoreState> = combineReducers({
  selectedSubreddit,
  postsBySubreddit,
  routing: routerReducer
});

export default rootReducer;
