// src/components/App.tsx

import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { RedditPost, StoreState, } from '../types/index';
import { Picker } from '../components/Picker';
import { Posts } from '../components/Posts';

import * as actions from '../actions/index';

interface Props {
  selectedSubreddit: string;
  posts: RedditPost[];
  isFetching: boolean;
  lastUpdated?: number;
}

interface Actions {
  fetchPostsIfNeeded: (subreddit: string) => Promise<actions.ReceivePosts> | Promise<null>;
  selectSubreddit: (subreddit: string) => void;
  invalidateSubreddit: (subreddit: string) => void;
}

class App extends React.PureComponent<Props & Actions> {
  constructor(props: Props & Actions) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleRefreshClick = this.handleRefreshClick.bind(this);
  }

  componentDidMount() {
    const { selectedSubreddit } = this.props;
    this.props.fetchPostsIfNeeded(selectedSubreddit);
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.selectedSubreddit !== this.props.selectedSubreddit) {
      this.props.fetchPostsIfNeeded(nextProps.selectedSubreddit);
    }
  }

  handleChange(nextSubreddit: string) {
    this.props.selectSubreddit(nextSubreddit);
  }

  handleRefreshClick(e: React.MouseEvent<HTMLElement>) {
    e.preventDefault();

    const { selectedSubreddit } = this.props;
    this.props.invalidateSubreddit(selectedSubreddit);
    this.props.fetchPostsIfNeeded(selectedSubreddit);
  }

  render() {
    const { selectedSubreddit, isFetching, posts, lastUpdated } = this.props;
    const isEmpty = posts.length === 0;
    return (
      <div>
        <Picker
          value={selectedSubreddit}
          onChange={this.handleChange}
          options={['reactjs', 'frontend', 'scala', 'pics', 'gifs']}
        />
        <p>
          {lastUpdated &&
            <span>
              Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
              {' '}
            </span>}

          {!isFetching &&
            <button onClick={this.handleRefreshClick}>Refresh</button>}
        </p>

        {isEmpty
          ? isFetching ? <h2>Loading...</h2> : <h2>Empty.</h2>
          : <div style={{ opacity: isFetching ? 0.5 : 1 }}>
            <Posts posts={posts} />
          </div>}

      </div>
    );
  }
}

function mapStateToProps({ selectedSubreddit, postsBySubreddit }: StoreState) {
  const { isFetching = false, lastUpdated = Date.now(), items } = postsBySubreddit;

  return {
    selectedSubreddit,
    isFetching,
    lastUpdated,
    posts: items.get(selectedSubreddit) || []
  };
}

function mapDispatchToProps(dispatch: Dispatch<StoreState>) {
  return {
    fetchPostsIfNeeded: (subreddit: string) => dispatch(actions.fetchPostsIfNeeded(subreddit)),
    selectSubreddit: (subreddit: string) => dispatch(actions.selectSubreddit(subreddit)),
    invalidateSubreddit: (subreddit: string) => dispatch(actions.invalidateSubreddit(subreddit))
  };
}

export default connect<Props, Actions>(mapStateToProps, mapDispatchToProps)(App);
