// src/containers/post/Detail.tsx

import { Detail, Props, Params } from '../../components/post/Detail';
import { StoreState, RedditPost } from '../../types/index';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';

export function mapStateToProps(state: StoreState, ownProps: Props & RouteComponentProps<Params>) {
  const { postsBySubreddit } = state;
  const channelPosts: RedditPost[] = postsBySubreddit.items.get(ownProps.match.params.subReddit) || [];
  const post = channelPosts.find((p: RedditPost) => p.id === ownProps.match.params.postId);

  return {
    selectedSubreddit: ownProps.match.params.subReddit,
    post
  };
}

export default withRouter(connect(mapStateToProps)(Detail));
