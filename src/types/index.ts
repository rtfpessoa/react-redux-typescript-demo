// src/types/index.ts

export interface StoreState {
  selectedSubreddit: string;
  postsBySubreddit: SubReddits;
}

export interface SubReddits {
  isFetching: boolean;
  didInvalidate: boolean;
  lastUpdated?: number;
  items: Map<string, RedditPost[]>;
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
