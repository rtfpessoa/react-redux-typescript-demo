// src/types/index.tsx

export interface SubReddits {
  isFetching: boolean;
  didInvalidate: boolean;
  lastUpdated?: number;
  items: Map<string, RedditPost[]>;
}

export interface StoreState {
  selectedSubreddit: string;
  postsBySubreddit: SubReddits;
}

export interface RedditPost {
  id: string;
  title: string;
  subreddit: string;
  num_comments: number;
  created_utc: number;
  url: string;
  selftext: string;
  selftext_html: string;
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
