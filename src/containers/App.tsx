// src/containers/App.tsx

import { App } from '../components/App';
import { StoreState } from '../types/index';
import { connect } from 'react-redux';

export function mapStateToProps({ selectedSubreddit, postsBySubreddit }: StoreState) {
  const {
    isFetching,
    lastUpdated,
    items: posts
  } = postsBySubreddit[selectedSubreddit] || {
    isFetching: true,
    items: [],
    lastUpdated: Date.now()
  };

  return {
    selectedSubreddit,
    posts,
    isFetching,
    lastUpdated
  };
}

export default connect(mapStateToProps)(App);
