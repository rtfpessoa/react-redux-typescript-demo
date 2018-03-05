// src/containers/App.tsx

import { App } from '../components/App';
import { StoreState } from '../types/index';
import { connect } from 'react-redux';

export function mapStateToProps({ selectedSubreddit, postsBySubreddit }: StoreState) {
  const {
    isFetching,
    lastUpdated,
  } = postsBySubreddit || {
    isFetching: true,
    lastUpdated: Date.now()
  };

  const posts = postsBySubreddit.items.get(selectedSubreddit) || [];

  return {
    selectedSubreddit,
    isFetching,
    posts,
    lastUpdated
  };
}

export default connect(mapStateToProps)(App);
