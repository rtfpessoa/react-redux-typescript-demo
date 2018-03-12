// src/components/post/Detail.tsx

import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';

import { RedditPost, StoreState } from '../../types/index';
import * as actions from '../../actions';

interface Params {
  subReddit: string;
  postId: string;
}

interface Props {
  selectedSubreddit: string;
  post: RedditPost | undefined;
  dispatch: Dispatch<StoreState>;
}

interface Actions {
  fetchPostsIfNeeded: (subreddit: string) => Promise<actions.ReceivePosts> | Promise<null>;
}

class Detail extends React.PureComponent<Props & Actions & RouteComponentProps<Params>> {
  componentDidMount() {
    const { selectedSubreddit } = this.props;
    this.props.fetchPostsIfNeeded(selectedSubreddit);
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
      return <h2>Loading...</h2>;
    }

    return (
      <div>
        <h4>Reddit &gt; <Link to={`/`}>{post.subreddit}</Link> &gt; {post.title}</h4>
        <div id={post.id}>
          <h1>{post.title}</h1>
          <ul>
            <li>URL: <a href={post.url}>{post.url}</a></li>
            <li>Comments: {post.num_comments}</li>
            <li>Created: {new Date(post.created_utc * 1000).toLocaleDateString()}</li>
          </ul>
          {post.selftext_html &&
            <div>
              <div dangerouslySetInnerHTML={{ __html: this.unescape(post.selftext_html) }} />
            </div>}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state: StoreState, ownProps: Props & RouteComponentProps<Params>) {
  const { postsBySubreddit } = state;
  const channelPosts: RedditPost[] = postsBySubreddit.items.get(ownProps.match.params.subReddit) || [];
  const post = channelPosts.find((p: RedditPost) => p.id === ownProps.match.params.postId);

  return {
    selectedSubreddit: ownProps.match.params.subReddit,
    post
  };
}

function mapDispatchToProps(dispatch: Dispatch<StoreState>) {
  return {
    fetchPostsIfNeeded: (subreddit: string) => dispatch(actions.fetchPostsIfNeeded(subreddit))
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Detail));
