import * as constants from '../constants';
import * as types from '../types/index';
import { Dispatch } from 'redux';

export type Action = RequestPosts | ReceivePosts | SelectSubreddit | InvalidateSubreddit;

export interface RequestPosts {
  type: constants.REQUEST_POSTS;
  subreddit: string;
}

export function requestPosts(subreddit: string): RequestPosts {
  return {
    type: constants.REQUEST_POSTS,
    subreddit
  };
}

export interface ReceivePosts {
  type: constants.RECEIVE_POSTS;
  subreddit: string;
  posts: types.RedditPost[];
  receivedAt: number;
}

export function receivePosts(subreddit: string, json: types.Response): ReceivePosts {
  return {
    type: constants.RECEIVE_POSTS,
    subreddit,
    posts: json.data.children.map((child: types.RedditPostElement) => child.data),
    receivedAt: Date.now()
  };
}

export interface SelectSubreddit {
  type: constants.SELECT_SUBREDDIT;
  subreddit: string;
}

export function selectSubreddit(subreddit: string): SelectSubreddit {
  return {
    type: constants.SELECT_SUBREDDIT,
    subreddit
  };
}

export interface InvalidateSubreddit {
  type: constants.INVALIDATE_SUBREDDIT;
  subreddit: string;
}

export function invalidateSubreddit(subreddit: string): InvalidateSubreddit {
  return {
    type: constants.INVALIDATE_SUBREDDIT,
    subreddit
  };
}

export function fetchPosts(subreddit: string) {
  return (dispatch: Dispatch<types.StoreState>) => {
    dispatch(requestPosts(subreddit));
    return fetch(`https://www.reddit.com/r/${subreddit}.json`)
      .then(response => response.json())
      .then(json => dispatch(receivePosts(subreddit, json)));
  };
}

export function shouldFetchPosts(state: types.StoreState, subreddit: string): boolean {
  const posts = state.postsBySubreddit[subreddit];
  if (!posts) {
    return true;
  }
  if (posts.isFetching) {
    return false;
  }
  return posts.didInvalidate;
}

export function fetchPostsIfNeeded(subreddit: string) {
  return (dispatch: Dispatch<types.StoreState>, getState: () => types.StoreState) => {
    if (shouldFetchPosts(getState(), subreddit)) {
      return dispatch(fetchPosts(subreddit));
    }
    return Promise.resolve(null);
  };
}
