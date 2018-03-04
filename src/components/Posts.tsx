// src/components/Posts.tsx

import * as React from 'react';
import { RedditPost } from '../types/index';

export interface Props {
  posts: RedditPost[];
}

export class Posts extends React.PureComponent<Props, object> {
  render() {
    const { posts } = this.props;
    return (
      <ul>
        {posts.map((post: RedditPost, i: number) =>
          <li key={i}>{post.title}</li>
        )}
      </ul>
    );
  }
}

export default Posts;
