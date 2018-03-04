// src/types/index.tsx

export interface SubReddit {
  isFetching: boolean;
  didInvalidate: boolean;
  items: RedditPost[];
  lastUpdated?: number;
}

export interface StoreState {
  selectedSubreddit: string;
  postsBySubreddit: [string, SubReddit];
}

export interface RedditPost {
  title: string;
}

export interface RedditPostElement {
  data: RedditPost;
}

interface ResponseData {
  children: RedditPostElement[];
}

export interface Response {
  data: ResponseData;
}
