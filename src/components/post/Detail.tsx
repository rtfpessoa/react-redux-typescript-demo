// src/components/post/Detail.tsx

import * as React from 'react';
import { Dispatch } from 'redux';
import { RouteComponentProps, Link } from 'react-router-dom';

import { RedditPost, StoreState } from '../../types/index';
import { fetchPostsIfNeeded } from '../../actions';

export interface Params {
  subReddit: string;
  postId: string;
}

export interface Props {
  selectedSubreddit: string;
  post: RedditPost | undefined;
  dispatch: Dispatch<StoreState>;
}

export class Detail extends React.Component<Props & RouteComponentProps<Params>> {
  componentDidMount() {
    const { dispatch, selectedSubreddit } = this.props;
    dispatch(fetchPostsIfNeeded(selectedSubreddit));
  }

  unescape(str: string) {
    return str.slice(0)
      .replace(new RegExp('&amp;', 'g'), '&')
      .replace(new RegExp('&lt;', 'g'), '<')
      .replace(new RegExp('&gt;', 'g'), '>')
      .replace(new RegExp('&quot;', 'g'), '"')
      .replace(new RegExp('&#x27;', 'g'), '\'')
      .replace(new RegExp('&#x2F;', 'g'), '\/');
  }

  render() {
    const { post } = this.props;

    if (!post) {
      return (
        <h2>Loading...</h2>
      );
    }

    return (
      <div>
        <div><Link to={`/`} >&lt;back</Link></div>
        <div id={post.id}>
          <h1>{post.title}</h1>
          <ul>
            <li>URL: <a href={post.url}>{post.url}</a></li>
            <li>Comments: {post.num_comments}</li>
            <li>Created: {new Date(post.created_utc * 1000).toLocaleDateString()}</li>
          </ul>
          {post.selftext_html &&
            (
              <div>
                <div dangerouslySetInnerHTML={{ __html: this.unescape(post.selftext_html) }} />
              </div>
            )
          }
        </div>
      </div>
    );
  }
}

export default Detail;
