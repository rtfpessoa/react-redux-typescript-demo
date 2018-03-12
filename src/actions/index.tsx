import { Action, ActionCreator, Dispatch } from 'redux';

import * as constants from '../constants';
import { RedditPost, StoreState } from '../types/index';
import { HTTPResponse, BaseResponse } from '../types/http';

export type RedditAction = RequestPosts | ReceivePosts | SelectSubreddit | InvalidateSubreddit;

export interface RequestPosts extends Action {
  type: constants.REQUEST_POSTS;
  subreddit: string;
}

export const requestPosts: ActionCreator<RequestPosts> = (subreddit: string) => {
  return {
    type: constants.REQUEST_POSTS,
    subreddit
  };
};

export interface ReceivePosts extends Action {
  type: constants.RECEIVE_POSTS;
  subreddit: string;
  posts: RedditPost[];
  receivedAt: number;
}

export const receivePosts: ActionCreator<ReceivePosts> =
  (subreddit: string, json: HTTPResponse<BaseResponse<RedditPost>>) => {
    return {
      type: constants.RECEIVE_POSTS,
      subreddit,
      posts: json.data.children.map((child: BaseResponse<RedditPost>) => child.data),
      receivedAt: Date.now()
    };
  };

export interface SelectSubreddit extends Action {
  type: constants.SELECT_SUBREDDIT;
  subreddit: string;
}

export const selectSubreddit: ActionCreator<SelectSubreddit> = (subreddit: string) => {
  return {
    type: constants.SELECT_SUBREDDIT,
    subreddit
  };
};

export interface InvalidateSubreddit extends Action {
  type: constants.INVALIDATE_SUBREDDIT;
  subreddit: string;
}

export const invalidateSubreddit: ActionCreator<InvalidateSubreddit> = (subreddit: string) => {
  return {
    type: constants.INVALIDATE_SUBREDDIT,
    subreddit
  };
};

export function fetchPosts(subreddit: string) {
  return (dispatch: Dispatch<StoreState>) => {
    dispatch(requestPosts(subreddit));
    return fetch(`https://www.reddit.com/r/${subreddit}.json`)
      .then(response => response.json())
      .then(json => dispatch(receivePosts(subreddit, json)));
  };
}

export function shouldFetchPosts(state: StoreState, subreddit: string): boolean {
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
  return (dispatch: Dispatch<StoreState>, getState: () => StoreState) => {
    if (shouldFetchPosts(getState(), subreddit)) {
      return dispatch(fetchPosts(subreddit));
    }
    return Promise.resolve(null);
  };
}
