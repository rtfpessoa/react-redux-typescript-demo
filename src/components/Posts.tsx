// src/components/Posts.tsx

import * as React from 'react';
import { Link } from 'react-router-dom';

import { RedditPost } from '../types/index';

export interface Props {
  posts: RedditPost[];
}

export const Posts = (props: Props) => {
  return (
    <ul>{props.posts.map(Post)}</ul>
  );
};

const Post = (post: RedditPost, index: number) => {
  return (
    <li key={index}><Link to={`/post/${post.subreddit}/${post.id}`}>{post.title}</Link></li>
  );
};
